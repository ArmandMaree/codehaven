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
import https, { Server as HttpsServer } from 'https';
import fs from 'fs';
import SocketHandler from './socket-handler';
import AquariumManager from './aquarium-manager';
import routes from './routes';
import logger from './logger';

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

const CERT_PREFIX = process.env.CERT_PREFIX || 'www.codehaven.me';
const certPath = path.resolve(__dirname, '../../sslcert');
let privateKey: string | undefined;

try {
  privateKey = fs.readFileSync(path.join(certPath, `${CERT_PREFIX}.key`), 'utf8').toString();
} catch (error:any) {
  logger.error('Error when reading file for privateKey.');
  logger.error(error);
}

let certificate: string | undefined;

try {
  certificate = fs.readFileSync(path.join(certPath, `${CERT_PREFIX}.crt`), 'utf8').toString();
} catch (error:any) {
  logger.error('Error when reading file for certificate.');
  logger.error(error);
}

const credentials = { key: privateKey, cert: certificate };

const app = express();
const httpServer = http.createServer(app);
let httpsServer: HttpsServer | undefined;

if (privateKey && certificate) {
  logger.info('Creating HTTPS server.');
  httpsServer = https.createServer(credentials, app);
} else {
  logger.info('Not creating HTTPS server since credentials are missing.');
}

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

    if (httpsServer) {
      app.listen(HTTPS_PORT, () => {
        logger.info(`HTTPS server listening on ${HTTPS_PORT}`);
      });
    }

    SocketHandler.register(httpServer, httpsServer);
  });
