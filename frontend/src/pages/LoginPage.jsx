import {
  useState,
  useContext
} from "react"

import {
  AuthContext
} from "../context/AuthContext"

function LoginPage() {

  const [username,
    setUsername] =
      useState("")

  const [password,
    setPassword] =
      useState("")

  const [error,
    setError] =
      useState("")

  const {
    login
  } = useContext(
    AuthContext
  )

  const handleSubmit =
    (e) => {

      e.preventDefault()

      if (
        !username ||
        !password
      ) {

        setError(
          "All fields are required"
        )

        return

      }

      const fakeJwtToken =
        "fake-jwt-token"

      login(
        fakeJwtToken
      )

      setError("")

    }

  return (

    <div
      style={{

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        height: "100vh"

      }}
    >

      <form
        onSubmit={
          handleSubmit
        }

        style={{

          width: "300px",

          padding: "30px",

          background:
            "white",

          borderRadius:
            "10px"

        }}
      >

        <h2>
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          style={{
            width: "100%",
            marginBottom:
              "10px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            marginBottom:
              "10px"
          }}
        />

        {error && (

          <p
            style={{
              color: "red"
            }}
          >
            {error}
          </p>

        )}

        <button
          type="submit"
        >
          Login
        </button>

      </form>

    </div>

  )

}

export default LoginPage