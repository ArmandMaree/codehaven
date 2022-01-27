import {
  getSchedule, getAllSchedules, upsertSchedule, deleteSchedule,
} from '../persistence/schedule';
import Schedule from '../persistence/models/schedule';
import { updateCronJob } from '../schedule-handler';
import { sendFeedCommand } from '../communicator/feed';
import { createLog } from '../persistence/log';
import logger from '../../logger';

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

const handleUpsertSchedule = (req: any, res: any) => {
  upsertSchedule(req.params.id,
    req.body.feederId,
    req.body.cron,
    req.body.duration)
    .then((schedule: Schedule) => {
      res.status(200).send();
      return schedule;
    })
    .then((schedule: Schedule) => {
      updateCronJob(schedule, async () => {
        sendFeedCommand(schedule.FeederId, schedule.duration)
          .then(() => {
            logger.info(`Successfully executed feed command on feeder with ID ${req.body.feederId}.`);
            return createLog(schedule.FeederId, schedule.duration, 'Scheduler', 'Success');
          })
          .catch(async (error) => {
            let message: string;

            if (error.message) {
              message = error.message;
            } else {
              message = error.toString();
            }

            logger.error(`Failed to execute scheduled feed command on feeder with ID ${schedule.FeederId}. Message: ${message}`);
            logger.error(error);
            await createLog(schedule.FeederId, schedule.duration, 'Scheduler', 'Failure', message);
          });
      });
    })
    .catch((error) => {
      req.log.error(error);
      res.status(500).send(error);
    });
};

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
