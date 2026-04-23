from flask import Blueprint, request, jsonify

categorise_bp = Blueprint('categorise', __name__)

@categorise_bp.route('/categorise', methods=['POST'])
def categorise():
    data = request.get_json()
    return jsonify({
        "category": "sample-category",
        "confidence": 0.9,
        "reasoning": "Temporary response until AI logic is added"
    })