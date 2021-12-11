// initialize configuration
/* eslint-disable import/first */
// eslint-disable-next-line import/order
const result = require('dotenv').config();

if (result.error) {
  throw result.error;
}

import path from 'path';
import express, { Router } from 'express';
import logger from './logger';
import routes from './routes';
import AquariumManager from './aquarium-manager';
// import Auth from './auth';
import SocketHandler from './socket-handler';

const PORT = process.env.PORT || 3001;

const app = express();

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

    const httpServer = app.listen(PORT, () => {
      logger.info(`Server listening on ${PORT}`);
    });

    SocketHandler.register(httpServer);
  });
