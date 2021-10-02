import path from 'path';
import express, { Router } from 'express';
import dotenv from 'dotenv';
import logger from './logger';
import routes from './routes';
import AquariumManager from './aquarium-manager';

// initialize configuration
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const PORT = process.env.PORT || 3001;

const app = express();
const clientPath = '../../client';

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, clientPath, 'build')));

routes.register(app).then((router: Router) => {
  AquariumManager.register(app, router);
}).then(() => {
  // All other GET requests not handled before will return our React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, clientPath, 'build', 'index.html'));
  });

  app.listen(PORT, () => {
    logger.info(`Server listening on ${PORT}`);
  });
});
