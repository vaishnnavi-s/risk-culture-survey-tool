export const getSurveys = async (
  page = 0
) => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 1000)
  )

  const allData = [

    {
      id: 1,
      title: "Employee Feedback",
      description:
        "Work culture survey",
      deleted: false
    },

    {
      id: 2,
      title: "Security Survey",
      description:
        "Security awareness",
      deleted: false
    },

    {
      id: 3,
      title: "HR Survey",
      description:
        "HR feedback",
      deleted: false
    },

    {
      id: 4,
      title: "Risk Survey",
      description:
        "Risk management",
      deleted: false
    }

  ]

  const itemsPerPage = 2

  const start =
    page * itemsPerPage

  const end =
    start + itemsPerPage

  return {

    content:
      allData.slice(
        start,
        end
      ),

    totalPages:
      Math.ceil(
        allData.length /
          itemsPerPage
      ),

    number: page

  }

}

export const createSurvey = async (
  surveyData
) => {

  return {

    id: Date.now(),

    ...surveyData,

    deleted: false

  }

}

export const updateSurvey = async (
  id,
  updatedData
) => {

  return {

    id,

    ...updatedData,

    deleted: false

  }

}

export const getStats = async () => {

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 1000)
  )

  return {

    totalSurveys: 24,

    activeSurveys: 18,

    completedSurveys: 6,

    deletedSurveys: 2,

    chartData: [

      {
        name: "HR",
        surveys: 8
      },

      {
        name: "Security",
        surveys: 5
      },

      {
        name: "Risk",
        surveys: 7
      },

      {
        name: "Culture",
        surveys: 4
      }

    ]

  }

}