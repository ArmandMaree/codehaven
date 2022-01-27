import express from 'express';
import router from './router';
import persistence from './persistence';
import { getAllSchedules } from './persistence/schedule';
import { updateCronJobsBulk } from './schedule-handler';
import { sendFeedCommand } from './communicator/feed';
import Schedule from './persistence/models/schedule';
import { createLog } from './persistence/log';
import logger from '../logger';

const register = async (app: express.Application, parentRouter: express.Router) => {
  await router.register(app, parentRouter);
  await persistence.register();
  const schedules = await getAllSchedules(false);

  updateCronJobsBulk(schedules, async (schedule: Schedule) => {
    sendFeedCommand(schedule.FeederId, schedule.duration)
      .then(() => {
        logger.info(`Successfully executed feed command on feeder with ID ${schedule.FeederId}.`);
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
};

export default { register };
