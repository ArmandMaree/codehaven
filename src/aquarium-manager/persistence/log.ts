import Log from './models/log';
import Feeder from './models/feeder';
import { getFeeder } from './feeder';

const getLogs = (limit: number, skip: number, includeFeeder: boolean) => {
  const options:any = {
    limit,
    offset: skip,
    order: [
      ['timestamp', 'DESC'],
    ],
  };

  if (includeFeeder) {
    options.include = 'Feeder';
  }

  return Log.findAll(options);
};

const createLog = (feederId: number, duration: number, actor: string, status: string, message?: string) => getFeeder(feederId).then((feeder: Feeder | null) => {
  if (feeder) {
    return feeder.createLog({
      duration,
      actor,
      status,
      message,
    });
  }

  throw new Error(`Feeder with ID ${feederId} does not exist.`);
});

export {
  getLogs,
  createLog,
};
