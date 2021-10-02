import { getAllStatuses } from '../communicator/status';

const handleGetAllStatuses = (req: any, res: any) => getAllStatuses()
  .then((statuses) => {
    res.status(200).send(statuses);
  })
  .catch((error) => {
    req.log.error(error);
    res.status(500).send(error);
  });

export {
  // eslint-disable-next-line import/prefer-default-export
  handleGetAllStatuses,
};
