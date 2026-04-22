export const getRisks = async () => {
  return {
    content: [
      {
        id: "1",
        title: "Security Risk",
        description: "Weak password policy",
        status: "OPEN",
        score: 85,
        createdAt: "2026-04-22"
      },
      {
        id: "2",
        title: "Compliance Risk",
        description: "Missing audit logs",
        status: "CLOSED",
        score: 60,
        createdAt: "2026-04-21"
      }
    ],
    totalElements: 2,
    totalPages: 1
  }
}