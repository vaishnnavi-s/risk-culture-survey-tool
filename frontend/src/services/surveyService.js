export const getSurveys = async () => {

  return {

    content: [

      {
        id: 1,
        title: "Security Risk",
        description: "Weak password policy",
        status: "OPEN",
        score: 85
      },

      {
        id: 2,
        title: "Compliance Risk",
        description: "Missing audit logs",
        status: "CLOSED",
        score: 60
      },

      {
        id: 3,
        title: "Network Risk",
        description: "Firewall issue",
        status: "OPEN",
        score: 90
      },

      {
        id: 4,
        title: "Cloud Risk",
        description: "Storage exposure",
        status: "OPEN",
        score: 70
      }

    ],

    totalPages: 2

  }

}