import express from "express"
import { Router } from 'express'
import { FeederController, StatusController, LogController, ScheduleController } from "./controllers"

const router = Router()

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
router.use(express.json());

router.get('/feeders/:id?', (req, res) => {
  try {
    FeederController.handleGetFeeder(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.put('/feeders/:id?', (req, res) => {
  try {
    FeederController.handleUpsertFeeder(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.delete('/feeders/:id', (req, res) => {
  try {
    FeederController.handleDeleteFeeder(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.get('/feeder-statuses', (req, res) => {
  try {
    StatusController.handleGetAllStatuses(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.post('/feed', (req, res) => {
  try {
    FeederController.handleFeed(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.get('/logs', (req, res) => {
  try {
    LogController.handleGetFeedLogs(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.get('/schedules/:id?', (req, res) => {
  try {
    ScheduleController.handleGetSchedule(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.put('/schedules/:id?', (req, res) => {
  try {
    ScheduleController.handleUpsertSchedule(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

router.delete('/schedules/:id', (req, res) => {
  try {
    ScheduleController.handleDeleteSchedule(req, res)
  }
  catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

export { router }