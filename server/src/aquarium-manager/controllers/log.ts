import { getFeedLogs } from "../helpers/log"

const handleGetFeedLogs = (req:any, res:any) => {
  return getFeedLogs(req.query.limit, req.query.skip)
    .then(logs => {
      res.status(200).send(logs)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

export {
  handleGetFeedLogs
}