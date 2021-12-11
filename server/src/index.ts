// initialize configuration
/* eslint-disable import/first */
// eslint-disable-next-line import/order
const result = require('dotenv').config();

if (result.error) {
  throw result.error;
}

import path from 'path';
import express, { Router } from 'express';
// import Auth from './auth';
import http from 'http';
import SocketHandler from './socket-handler';
import AquariumManager from './aquarium-manager';
import routes from './routes';
import logger from './logger';

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

const clientRelativePath = '../../client';
const clientBuildAbsolutePath = path.resolve(__dirname, clientRelativePath, 'build');

// Have Node serve the files for our built React app
app.use(express.static(clientBuildAbsolutePath));
let apiRouter: Router | undefined;

routes.register(app)
  .then((router: Router) => {
    apiRouter = router;
    //   return Auth.register(app);
    // })
    // .then(() => {
    return AquariumManager.register(app, apiRouter!)
      .catch(() => { });
  })
  .then(() => {
    // All other GET requests not handled before will return our React app
    app.get('*', (req, res) => {
      logger.info(`GET request was received on ${req.url}. Catch-all is returning homepage.`);
      res.sendFile(path.resolve(clientBuildAbsolutePath, 'index.html'));
    });

    app.listen(HTTP_PORT, () => {
      logger.info(`HTTP server listening on ${HTTP_PORT}`);
    });

    SocketHandler.register(httpServer);
  });
