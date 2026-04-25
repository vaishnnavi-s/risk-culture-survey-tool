import {
  useEffect,
  useState
} from "react"

import {
  getStats
} from "../services/surveyService"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

function DashboardPage() {

  const [stats,
    setStats] = useState(null)

  const [loading,
    setLoading] = useState(true)

  useEffect(() => {

    const fetchStats = async () => {

      const result =
        await getStats()

      setStats(result)

      setLoading(false)

    }

    fetchStats()

  }, [])

 if (loading) {

  return (

    <div
      style={{

        height: "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center"

      }}
    >

      <h1
        style={{
          fontSize: "40px"
        }}
      >
        Loading Dashboard...
      </h1>

    </div>

  )

}

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        Dashboard
      </h1>

      <div
        style={{

          display: "grid",

          gridTemplateColumns:
            "repeat(4, 1fr)",

          gap: "20px",

          marginBottom: "40px"

        }}
      >

        <div style={cardStyle}>
          <h3>Total Surveys</h3>
          <h1>
            {stats.totalSurveys}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Active Surveys</h3>
          <h1>
            {stats.activeSurveys}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Completed</h3>
          <h1>
            {stats.completedSurveys}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Deleted</h3>
          <h1>
            {stats.deletedSurveys}
          </h1>
        </div>

      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}
      >

        <h2>
          Surveys By Category
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={stats.chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="surveys"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}

const cardStyle = {

  background: "white",

  padding: "20px",

  borderRadius: "10px",

  textAlign: "center",

  boxShadow:
    "0px 4px 10px rgba(0,0,0,0.1)"

}

export default DashboardPage