const getSchedule = (id:number) => {
  return Promise.resolve({
    id: 1,
    feederId: 1,
    feederName: "10 Gallon Feeder",
    cron: "0 8 * * *"
  })
}

const getAllSchedules = () => {
  return Promise.resolve([
    {
      id: 1,
      feederName: "10 Gallon Aquarium",
      cron: "0 8 * * *"
    }
  ])
}

const upsertSchedule = (id:number, feederId:number, cron:string) => {
  return Promise.resolve()
}

const deleteSchedule = (id:number) => {
  return Promise.resolve()
}

export {
  getSchedule,
  getAllSchedules,
  upsertSchedule,
  deleteSchedule
}