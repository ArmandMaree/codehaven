const getAllStatuses = () => {
  return Promise.resolve([
    {
      id: 1,
      name: "10 Gallon Aquarium",
      status: "Operational",
      code: 200,
      message: "I am online!"
    }
  ])
}

export {
  getAllStatuses
}