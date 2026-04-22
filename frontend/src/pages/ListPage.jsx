import { useEffect, useState } from "react"
import { getRisks } from "../services/riskService"
import "./ListPage.css"

function ListPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRisks()

      setData(result.content)

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <h1 className="loading">Loading...</h1>
  }

  return (
    <div className="container">

      <h1 className="title">
        Risk Survey List
      </h1>

      <table className="risk-table">

        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item) => (

            <tr key={item.id}>

              <td>{item.title}</td>

              <td>{item.description}</td>

              <td>
                <span
                  className={
                    item.status === "OPEN"
                      ? "status-open"
                      : "status-closed"
                  }
                >
                  {item.status}
                </span>
              </td>

              <td>{item.score}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default ListPage