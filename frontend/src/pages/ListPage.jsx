import { getSurveys } from "../services/surveyService"
import { useEffect, useState } from "react"
import "./ListPage.css"

function ListPage() {

  const [data, setData] = useState([])

  const [page, setPage] = useState(1)

  const [sortOrder, setSortOrder] = useState("asc")

  useEffect(() => {

  const fetchData = async () => {

    const result = await getSurveys()

    setData(result.content)

  }

  fetchData()

}, [])

  const handleSort = () => {

    const sorted = [...data].sort((a, b) => {

      if (sortOrder === "asc") {
        return a.score - b.score
      }

      return b.score - a.score

    })

    setData(sorted)

    setSortOrder(
      sortOrder === "asc" ? "desc" : "asc"
    )

  }

  const itemsPerPage = 2

  const startIndex = (page - 1) * itemsPerPage

  const paginatedData =
    data.slice(
      startIndex,
      startIndex + itemsPerPage
    )

  return (

    <div className="list-container">

      <div className="table-card">

        <h1 className="table-title">
          Risk Survey List
        </h1>

        <table>

          <thead>

            <tr>

              <th>Title</th>

              <th>Description</th>

              <th>Status</th>

              <th
                onClick={handleSort}
                style={{ cursor: "pointer" }}
              >
                Score ↕
              </th>

            </tr>

          </thead>

          <tbody>

            {paginatedData.map((item) => (

              <tr key={item.id}>

                <td>{item.title}</td>

                <td>{item.description}</td>

                <td>

                  <span
                    className={
                      item.status === "OPEN"
                        ? "open-status"
                        : "closed-status"
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

        <div className="pagination">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>
            Page {page}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={
              startIndex + itemsPerPage >= data.length
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>

  )

}

export default ListPage