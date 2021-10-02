import express, { Router } from 'express';
import { expressLogger } from './logger';

const router = Router();

const register = (app: express.Application): Promise<Router> => {
  app.use(expressLogger);

  // Define subrouter for /api routes
  app.use('/api', router);

  // Parse URL-encoded bodies (as sent by HTML forms)
  router.use(express.urlencoded({ extended: true }));

  // Parse JSON bodies (as sent by API clients)
  router.use(express.json());

  // Handle GET requests to /health route
  router.get('/health', (req, res) => {
    res.status(200).send({
      status: 'running',
    });
  });

  return Promise.resolve(router);
};

export default { register };
