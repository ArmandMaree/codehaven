import { getLogs } from '../persistence/log';
import Log from '../persistence/models/log';

const handleGetFeedLogs = (req: any, res: any) => getLogs(Number(req.query.limit), Number(req.query.skip), true)
  .then((logs: Log[]) => {
    res.status(200).send(logs);
  })
  .catch((error) => {
    req.log.error(error);
    res.status(500).send(error);
  });

export {
  // eslint-disable-next-line import/prefer-default-export
  handleGetFeedLogs,
};
