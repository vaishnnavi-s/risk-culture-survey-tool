import json
import logging
from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from services.groq_client import groq_client

logger = logging.getLogger("categorise")

categorise_bp = Blueprint("categorise", __name__)

# Valid categories — must match prompt exactly
VALID_CATEGORIES = [
    "Leadership & Governance",
    "Risk Awareness",
    "Communication & Reporting",
    "Accountability",
    "Training & Competency",
    "Policies & Procedures",
    "Incident & Near Miss",
    "Culture & Behaviour"
]


def load_prompt() -> str:
    """Load the categorise prompt template from file."""
    try:
        with open("prompts/categorise_prompt.txt", "r", encoding="utf-8") as f:
            return f.read().strip()
    except FileNotFoundError:
        logger.error("categorise_prompt.txt not found in prompts/")
        raise


def parse_ai_response(content: str) -> dict:
    """
    Safely parse the AI JSON response.
    Handles cases where model wraps output in markdown code blocks.
    """
    # Strip markdown code blocks if present
    cleaned = content.strip()
    if cleaned.startswith("```"):
        lines = cleaned.split("\n")
        cleaned = "\n".join(lines[1:-1]).strip()

    parsed = json.loads(cleaned)

    # Validate required fields
    if "category" not in parsed:
        raise ValueError("Missing 'category' in AI response")
    if "confidence" not in parsed:
        raise ValueError("Missing 'confidence' in AI response")
    if "reasoning" not in parsed:
        raise ValueError("Missing 'reasoning' in AI response")

    # Validate confidence range
    confidence = float(parsed["confidence"])
    if not (0.0 <= confidence <= 1.0):
        raise ValueError(f"Confidence {confidence} is out of range 0.0-1.0")

    # Validate category is one of the known list
    if parsed["category"] not in VALID_CATEGORIES:
        logger.warning(f"Unknown category returned: {parsed['category']}")

    return {
        "category":   parsed["category"],
        "confidence": round(confidence, 2),
        "reasoning":  parsed["reasoning"].strip()
    }


@categorise_bp.route("/categorise", methods=["POST"])
def categorise():
    """
    POST /categorise
    Body: { "text": "survey response text here" }

    Returns:
    {
        "category":     str,
        "confidence":   float (0.0 - 1.0),
        "reasoning":    str,
        "generated_at": str (ISO timestamp),
        "is_fallback":  bool
    }
    """

    # ── 1. Validate request body ─────────────────────────────────────────────
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Request body must be JSON",
            "code":  "INVALID_JSON"
        }), 400

    text = data.get("text", "").strip()

    if not text:
        return jsonify({
            "error": "Field 'text' is required and cannot be empty",
            "code":  "MISSING_TEXT"
        }), 400

    if len(text) < 10:
        return jsonify({
            "error": "Field 'text' must be at least 10 characters",
            "code":  "TEXT_TOO_SHORT"
        }), 400

    if len(text) > 5000:
        return jsonify({
            "error": "Field 'text' must not exceed 5000 characters",
            "code":  "TEXT_TOO_LONG"
        }), 400

    # ── 2. Load prompt and call Groq ─────────────────────────────────────────
    try:
        system_prompt = load_prompt()
    except FileNotFoundError:
        return jsonify({
            "error": "Prompt template not found. Contact the development team.",
            "code":  "PROMPT_NOT_FOUND"
        }), 500

    logger.info(f"Categorising text of length {len(text)}")

    ai_result = groq_client.chat(
        system_prompt=system_prompt,
        user_message=f"Classify this risk culture survey response:\n\n{text}",
        temperature=0.1,   # low temperature = consistent classification
        max_tokens=200
    )

    # ── 3. Handle fallback (Groq unavailable) ────────────────────────────────
    if ai_result["is_fallback"]:
        logger.error("Groq unavailable — returning fallback for /categorise")
        return jsonify({
            "category":     "Uncategorised",
            "confidence":   0.0,
            "reasoning":    "AI service is temporarily unavailable.",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "is_fallback":  True
        }), 200

    # ── 4. Parse AI response ─────────────────────────────────────────────────
    try:
        parsed = parse_ai_response(ai_result["content"])
    except (json.JSONDecodeError, ValueError, KeyError) as e:
        logger.error(f"Failed to parse AI response: {e}")
        logger.error(f"Raw AI content: {ai_result['content']}")
        return jsonify({
            "error": "Failed to parse AI response. Please try again.",
            "code":  "PARSE_ERROR"
        }), 500

    # ── 5. Return structured response ────────────────────────────────────────
    return jsonify({
        "category":     parsed["category"],
        "confidence":   parsed["confidence"],
        "reasoning":    parsed["reasoning"],
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "is_fallback":  False
    }), 200