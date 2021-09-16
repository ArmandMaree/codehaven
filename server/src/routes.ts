import express from "express"
import { Router } from 'express'

const router = Router()

export const register = ( app: express.Application ) => {
  // Define subrouter for /api routes
  app.use('/api', router);

	// Parse URL-encoded bodies (as sent by HTML forms)
	router.use(express.urlencoded({ extended: true }));

	// Parse JSON bodies (as sent by API clients)
	router.use(express.json());

  // Handle GET requests to / route
  router.get('/health', (req, res) => {
    res.status(200).send({
      status: 'running'
    })
  })

  // Handle GET requests to /feeder route
  router.get('/aquarium-manager/feeders', (req, res) => {
    res.status(200).send([{
      id: 1,
      name: "10 Gallon Tank",
      defaultDuration: 500
    }])
  })

  // Handle GET requests to /feeder route
  router.get('/aquarium-manager/feeders/:feederId', (req, res) => {
    res.status(200).send({
      id: 1,
      name: "10 Gallon Tank",
      defaultDuration: 500
    })
  })

  // Handle PUT requests to /feeder route
  router.put('/aquarium-manager/feeders', (req, res) => {
    res.status(200).send()
  })

  // Handle PUT requests to /feeder route
  router.put('/aquarium-manager/feeders/:feederId', (req, res) => {
    res.status(200).send()
  })

  // Handle DELETE requests to /feeder route
  router.delete('/aquarium-manager/feeders/:feederId', (req, res) => {
    res.status(200).send()
  })

  // Handle GET requests to /feeder/status route
  router.get('/aquarium-manager/feeder-statuses', (req, res) => {
    res.status(200).send([
      {
        id: 1,
        name: "10 Gallon Tank",
        status: "Operational",
        code: 200,
        message: "I am online!"
      }
    ])
  })

  // Handle POST requests to /feeder/feed route
  router.post('/aquarium-manager/feed', (req, res) => {
    res.status(200).send()
  })

  // Handle GET requests to /feeder/feed route
  router.get('/aquarium-manager/logs', (req, res) => {
    res.status(200).send([
      {
        timestamp: 1631582146611,
        name: "10 Gallon Tank",
        duration: 500,
        actor: 'Manual',
        status: 'Success',
        message: 'Triggered'
      }
    ])
  })

  // Handle GET requests to /feeder/feed route
  router.get('/aquarium-manager/schedules', (req, res) => {
    res.status(200).send([
      {
        id: 1,
        feederName: "10 Gallon Feeder",
        cron: "0 8 * * *"
      }
    ])
  })

  // Handle GET requests to /feeder/feed route
  router.get('/aquarium-manager/schedules/', (req, res) => {
    res.status(200).send([
      {
        id: 1,
        feederId: 1,
        feederName: "10 Gallon Feeder",
        cron: "0 8 * * *"
      }
    ])
  })

  // Handle GET requests to /feeder route
  router.get('/aquarium-manager/schedules/:scheduleId', (req, res) => {
    res.status(200).send(      {
      id: 1,
      feederId: 1,
      feederName: "10 Gallon Feeder",
      cron: "0 8 * * *"
    })
  })

  // Handle PUT requests to /feeder route
  router.put('/aquarium-manager/schedules', (req, res) => {
    res.status(200).send()
  })

  // Handle PUT requests to /feeder route
  router.put('/aquarium-manager/schedules/:scheduleId', (req, res) => {
    res.status(200).send()
  })

  // Handle DELETE requests to /feeder route
  router.delete('/aquarium-manager/schedules/:scheduleId', (req, res) => {
    res.status(200).send()
  })

};