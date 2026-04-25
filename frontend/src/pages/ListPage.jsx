import {
  getSurveys
} from "../services/surveyService"

import {
  useEffect,
  useState
} from "react"

import "./ListPage.css"

function ListPage({
  setEditingSurvey
}) {

  const [data, setData] =
    useState([])

  const [page, setPage] =
    useState(0)

  const [totalPages,
    setTotalPages] =
      useState(0)

  const [loading,
    setLoading] =
      useState(true)

  const [sortOrder,
    setSortOrder] =
      useState("asc")

  useEffect(() => {

    const fetchData =
      async () => {

        setLoading(true)

        const result =
          await getSurveys(page)

        setData(
          result.content
        )

        setTotalPages(
          result.totalPages
        )

        setLoading(false)

      }

    fetchData()

  }, [page])

  const handleSort = () => {

    const sorted =
      [...data].sort(
        (a, b) => {

          if (
            sortOrder ===
            "asc"
          ) {

            return a.title
              .localeCompare(
                b.title
              )

          }

          return b.title
            .localeCompare(
              a.title
            )

        }
      )

    setData(sorted)

    setSortOrder(

      sortOrder === "asc"
        ? "desc"
        : "asc"

    )

  }

  if (loading) {

    return (
      <h2>
        Loading surveys...
      </h2>
    )

  }

  return (

    <div className="list-container">

      <div className="table-card">

        <h1 className="table-title">
          Risk Survey List
        </h1>

        <table>

          <thead>

            <tr>

              <th
                onClick={
                  handleSort
                }
                style={{
                  cursor:
                    "pointer"
                }}
              >
                Title ↕
              </th>

              <th>
                Description
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length ===
              0 && (

              <tr>

                <td
                  colSpan="3"
                >
                  No surveys found
                </td>

              </tr>

            )}

            {data.map(
              (item) => (

                <tr
                  key={item.id}
                >

                  <td>
                    {item.title}
                  </td>

                  <td>
                    {
                      item.description
                    }
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        setEditingSurvey(
                          item
                        )
                      }
                    >
                      Edit
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

        <div className="pagination">

          <button
            onClick={() =>
              setPage(
                page - 1
              )
            }
            disabled={
              page === 0
            }
          >
            Previous
          </button>

          <span>

            Page {page + 1}

          </span>

          <button
            onClick={() =>
              setPage(
                page + 1
              )
            }
            disabled={
              page + 1 >=
              totalPages
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