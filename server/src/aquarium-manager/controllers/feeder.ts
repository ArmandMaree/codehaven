import { getFeeder, getAllFeeders, upsertFeeder, deleteFeeder } from "../helpers/feeder"

const handleGetFeeder = (req:any, res:any) => {
  let helperPromise

  if (!req.params.id) {
    helperPromise = getAllFeeders()
  }
  else {
    helperPromise = getFeeder(req.params.id)
  }

  return helperPromise
    .then(response => {
      res.status(200).send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

const handleUpsertFeeder = (req:any, res:any) => {
  return upsertFeeder(req.params.id, req.body.name, req.body.defaultDuration)
    .then(() => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

const handleDeleteFeeder = (req:any, res:any) => {
  return deleteFeeder(req.params.id)
    .then(() => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

const handleFeed = (req:any, res:any) => {
  return Promise.resolve()
    .then(() => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

export {
  handleGetFeeder,
  handleUpsertFeeder,
  handleDeleteFeeder,
  handleFeed
}