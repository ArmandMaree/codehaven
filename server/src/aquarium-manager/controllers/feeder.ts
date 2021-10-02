import {
  getFeeder, getAllFeeders, upsertFeeder, deleteFeeder,
} from '../persistence/feeder';
import Feeder from '../persistence/models/feeder';
import { createLog } from '../persistence/log';

type FeederZeroToMany = null | Feeder | Feeder[];

const handleGetFeeder = (req: any, res: any) => {
  let helperPromise: Promise<FeederZeroToMany>;

  if (!req.params.id) {
    helperPromise = getAllFeeders();
  } else {
    helperPromise = getFeeder(req.params.id);
  }

  return helperPromise
    .then((response: FeederZeroToMany) => {
      req.log.debug(`response: ${response}`);
      res.status(200).send(response);
    })
    .catch((error) => {
      req.log.error(error);
      res.status(500).send(error);
    });
};

const handleUpsertFeeder = (req: any, res: any) => {
  return upsertFeeder(req.params.id,
    req.body.name,
    req.body.defaultDuration)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      req.log.error(error);
      res.status(500).send(error);
    });
};

const handleDeleteFeeder = (req: any, res: any) => {
  return deleteFeeder(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      req.log.error(error);
      res.status(500).send(error);
    });
};

const handleFeed = (req: any, res: any) => {
  return Promise.reject(new Error('Not implemented'))
    .catch(async (error) => {
      let message: string;

      if (error.message) {
        message = error.message;
      } else {
        message = error.toString();
      }

      await createLog(req.body.feederId, req.body.duration, 'Manual', 'Failure', message);
      throw error;
    })
    .then(() => {
      return createLog(req.body.feederId, req.body.duration, 'Manual', 'Success');
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      req.log.error(error);
      res.status(500).send(error);
    });
};

export {
  handleGetFeeder,
  handleUpsertFeeder,
  handleDeleteFeeder,
  handleFeed,
};
