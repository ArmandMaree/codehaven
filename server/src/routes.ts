import express from "express"
import { Router } from 'express'
import { AquariumManagerRouter } from './aquarium-manager'

const router = Router()

export const register = ( app: express.Application ) => {
  // Define subrouter for /api routes
  app.use('/api', router);

	// Parse URL-encoded bodies (as sent by HTML forms)
	router.use(express.urlencoded({ extended: true }));

	// Parse JSON bodies (as sent by API clients)
	router.use(express.json());

  // Handle GET requests to /health route
  router.get('/health', (req, res) => {
    res.status(200).send({
      status: 'running'
    })
  })

  router.use('/aquarium-manager', AquariumManagerRouter)
};
