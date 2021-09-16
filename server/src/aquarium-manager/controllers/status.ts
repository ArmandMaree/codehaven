import { getAllStatuses } from "../helpers/status"

const handleGetAllStatuses = (req:any, res:any) => {
  return getAllStatuses()
    .then(statuses => {
      res.status(200).send(statuses)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

export {
  handleGetAllStatuses
}