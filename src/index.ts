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
// import http from 'http';
import SocketHandler from './socket-handler';
import AquariumManager from './aquarium-manager';
import routes from './routes';
import logger from './logger';

const HTTP_PORT = process.env.HTTP_PORT || 3080;

const app = express();
// const httpServer = http.createServer(app);

const clientRelativePath = '../../client';
const clientBuildAbsolutePath = path.resolve(__dirname, clientRelativePath, 'build');

// Have Node serve the files for our built React app
app.use(express.static(clientBuildAbsolutePath));

routes.register(app)
  .then((router: Router) => {
    return AquariumManager.register(app, router!)
      .catch(() => { });
  })
  .then(() => {
    const httpServer = app.listen(HTTP_PORT, () => {
      logger.info(`HTTP server listening on ${HTTP_PORT}`);
    });

    SocketHandler.register(httpServer);
  });
