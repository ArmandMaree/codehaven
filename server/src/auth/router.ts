import express, { Router } from 'express';
import cors from 'cors';
import { LoginController } from './controllers';

const router = Router();

const register = (app: express.Application): Promise<Router> => {
  app.use('/auth', router);
  app.use(cors);

  // Parse URL-encoded bodies (as sent by HTML forms)
  router.use(express.urlencoded({ extended: true }));

  // Parse JSON bodies (as sent by API clients)
  router.use(express.json());

  router.post('/login', (req, res) => {
    try {
      LoginController.handleLogin(req, res);
    } catch (e) {
      res.status(500).send(JSON.stringify(e));
    }
  });

  return Promise.resolve(router);
};

export default { register };
