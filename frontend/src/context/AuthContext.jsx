import {
  createContext,
  useState
} from "react"

export const AuthContext =
  createContext()

export function AuthProvider({
  children
}) {

  const [token, setToken] =
    useState(

      localStorage.getItem(
        "token"
      ) || ""

    )

  const login = (
    fakeJwtToken
  ) => {

    localStorage.setItem(
      "token",
      fakeJwtToken
    )

    setToken(
      fakeJwtToken
    )

  }

  const logout = () => {

    localStorage.removeItem(
      "token"
    )

    setToken("")

  }

  return (

    <AuthContext.Provider
      value={{

        token,

        login,

        logout,

        isAuthenticated:
          !!token

      }}
    >

      {children}

    </AuthContext.Provider>

  )

}