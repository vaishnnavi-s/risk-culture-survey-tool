import { useState } from "react"
import "./FormPage.css"

function FormPage() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "OPEN",
    score: ""
  })

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setErrors({
      ...errors,
      [e.target.name]: ""
    })

  }

  const validate = () => {

    let newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.score) {
      newErrors.score = "Score is required"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!validate()) {
      return
    }

    console.log(formData)

    setMessage("Survey submitted successfully!")

    setFormData({
      title: "",
      description: "",
      status: "OPEN",
      score: ""
    })

  }

  return (

    <div className="form-container">

      <div className="form-card">

        <h1 className="form-title">
          Create Risk Survey
        </h1>

        <form onSubmit={handleSubmit}>

          <label>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter risk title"
          />

          {errors.title && (
            <p className="error">{errors.title}</p>
          )}

          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          {errors.description && (
            <p className="error">{errors.description}</p>
          )}

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <label>Score</label>

          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            placeholder="Enter score"
          />

          {errors.score && (
            <p className="error">{errors.score}</p>
          )}

          <button
  type="submit"
  style={{
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Submit Survey
</button>

        </form>

        {message && (
          <p className="message">{message}</p>
        )}

      </div>

    </div>

  )

}

export default FormPage