import {
  useContext
} from "react"

import {
  AuthContext
} from "../context/AuthContext"

import LoginPage from
  "../pages/LoginPage"

function ProtectedRoute({
  children
}) {

  const {
    isAuthenticated
  } = useContext(
    AuthContext
  )

  if (
    !isAuthenticated
  ) {

    return <LoginPage />

  }

  return children

}

export default ProtectedRoute