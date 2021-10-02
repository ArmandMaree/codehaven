import {
  getSchedule, getAllSchedules, upsertSchedule, deleteSchedule,
} from '../persistence/schedule';
import Schedule from '../persistence/models/schedule';

type ScheduleZeroToMany = null | Schedule | Schedule[];

const handleGetSchedule = (req: any, res: any) => {
  let helperPromise: Promise<ScheduleZeroToMany>;

  if (!req.params.id) {
    helperPromise = getAllSchedules(true);
  } else {
    helperPromise = getSchedule(req.params.id, true);
  }

  return helperPromise
    .then((response: ScheduleZeroToMany) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      req.log.error(error);
      res.status(500).send(error);
    });
};

const handleUpsertSchedule = (req: any, res: any) => upsertSchedule(req.params.id,
  req.body.feederId,
  req.body.cron)
  .then(() => {
    res.status(200).send();
  })
  .catch((error) => {
    req.log.error(error);
    res.status(500).send(error);
  });

const handleDeleteSchedule = (req: any, res: any) => deleteSchedule(req.params.id)
  .then(() => {
    res.status(200).send();
  })
  .catch((error) => {
    req.log.error(error);
    res.status(500).send(error);
  });

export {
  handleGetSchedule,
  handleUpsertSchedule,
  handleDeleteSchedule,
};
