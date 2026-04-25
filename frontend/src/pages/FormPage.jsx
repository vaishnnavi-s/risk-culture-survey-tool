import {
  useState,
  useEffect
} from "react"

import {
  createSurvey,
  updateSurvey
} from "../services/surveyService"

import "./FormPage.css"

function FormPage({
  editingSurvey
}) {

  const [formData, setFormData] =
    useState({
      title: "",
      description: ""
    })

  const [errors, setErrors] =
    useState({})

  const [message, setMessage] =
    useState("")

  useEffect(() => {

    if (editingSurvey) {

      setFormData({

        title:
          editingSurvey.title,

        description:
          editingSurvey.description

      })

    }

  }, [editingSurvey])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })

    setErrors({
      ...errors,
      [e.target.name]: ""
    })

  }

  const validate = () => {

    let newErrors = {}

    if (!formData.title.trim()) {

      newErrors.title =
        "Title is required"

    }

    if (
      !formData.description.trim()
    ) {

      newErrors.description =
        "Description is required"

    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors)
        .length === 0
    )

  }

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      if (!validate()) {
        return
      }

      let response

      if (editingSurvey) {

        response =
          await updateSurvey(
            editingSurvey.id,
            formData
          )

        setMessage(
          "Survey updated successfully!"
        )

      } else {

        response =
          await createSurvey(
            formData
          )

        setMessage(
          "Survey created successfully!"
        )

      }

      console.log(response)

      setFormData({
        title: "",
        description: ""
      })

    }

  return (

    <div className="form-container">

      <div className="form-card">

        <h1 className="form-title">

          {editingSurvey
            ? "Edit Survey"
            : "Create Survey"}

        </h1>

        <form
          onSubmit={handleSubmit}
        >

          <label>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={
              handleChange
            }
            placeholder="Enter survey title"
          />

          {errors.title && (

            <p className="error">
              {errors.title}
            </p>

          )}

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Enter description"
          />

          {errors.description && (

            <p className="error">
              {
                errors.description
              }
            </p>

          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "20px",
              backgroundColor:
                "blue",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >

            {editingSurvey
              ? "Update Survey"
              : "Submit Survey"}

          </button>

        </form>

        {message && (

          <p className="message">
            {message}
          </p>

        )}

      </div>

    </div>

  )

}

export default FormPage