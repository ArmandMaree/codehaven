const getFeedLogs = (limit:number, skip:number) => {
  return Promise.resolve([
    {
      timestamp: 1631582146611,
      name: "10 Gallon Aquarium",
      duration: 500,
      actor: 'Manual',
      status: 'Success',
      message: 'Triggered'
    }
  ])
}

export {
  getFeedLogs
}