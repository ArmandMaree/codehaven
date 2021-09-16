import { getSchedule, getAllSchedules, upsertSchedule, deleteSchedule } from "../helpers/schedule"

const handleGetSchedule = (req:any, res:any) => {
  let helperPromise

  if (!req.params.id) {
    helperPromise = getAllSchedules()
  }
  else {
    helperPromise = getSchedule(req.params.id)
  }

  return helperPromise
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

const handleUpsertSchedule = (req:any, res:any) => {
  return upsertSchedule(req.params.id, req.body.name, req.body.defaultDuration)
    .then(() => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

const handleDeleteSchedule = (req:any, res:any) => {
  return deleteSchedule(req.params.id)
    .then(() => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

export {
  handleGetSchedule,
  handleUpsertSchedule,
  handleDeleteSchedule
}