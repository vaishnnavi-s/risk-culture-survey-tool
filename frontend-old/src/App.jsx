import { useState } from "react"

import ProtectedRoute
  from "./components/ProtectedRoute"

import DashboardPage
  from "./pages/DashboardPage"

import ListPage
  from "./pages/ListPage"

import FormPage
  from "./pages/FormPage"

function App() {

  const [editingSurvey,
    setEditingSurvey] =
      useState(null)

  return (

    <ProtectedRoute>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          paddingBottom: "40px"
        }}
      >

        <DashboardPage />

        <FormPage
          editingSurvey={editingSurvey}
        />

        <ListPage
          setEditingSurvey={
            setEditingSurvey
          }
        />

      </div>

    </ProtectedRoute>

  )

}

export default App