import Cron from 'cron';
import Schedule from '../persistence/models/schedule';

type ScheduleHandlerCallBack = (schedule: Schedule) => void;

const jobs = new Map<number, Cron.CronJob>();

const updateCronJob = (schedule: Schedule, jobCallbackFunction: ScheduleHandlerCallBack) => {
  if (jobs.has(schedule.FeederId)) {
    jobs.get(schedule.FeederId)!.stop();
    jobs.delete(schedule.FeederId);
  }

  jobs.set(schedule.FeederId, new Cron.CronJob(schedule.cron, () => {
    jobCallbackFunction(schedule);
  }));
  jobs.get(schedule.FeederId)!.start();
};

const updateCronJobsBulk = (schedules: Schedule[], jobCallbackFunction: ScheduleHandlerCallBack) => {
  schedules.forEach((schedule) => {
    updateCronJob(schedule, () => {
      jobCallbackFunction(schedule);
    });
  });
};

export {
  updateCronJob,
  updateCronJobsBulk,
};
