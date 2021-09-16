import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import * as routes from "./routes";

// initialize configuration
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const PORT = process.env.PORT || 3001;

const app = express();
const clientPath = '../../client'

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, clientPath, 'build')));

// Configure routes
routes.register(app);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, clientPath, 'build', 'index.html'));
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server listening on ${PORT}`);
});