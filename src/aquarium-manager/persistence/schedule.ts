import Schedule from './models/schedule';
import Feeder from './models/feeder';
import { getFeeder } from './feeder';

const getSchedule = (id: number, includeFeeder: boolean) => {
  const options: any = {};

  if (includeFeeder) {
    options.include = 'Feeder';
  }

  return Schedule.findByPk(id, options);
};

const getAllSchedules = (includeFeeder: boolean) => {
  const options: any = {};

  if (includeFeeder) {
    options.include = 'Feeder';
  }

  return Schedule.findAll(options);
};

const upsertSchedule = (id: number, feederId: number, cron: string, duration: number) => getFeeder(feederId)
  .then((feeder: Feeder | null) => {
    if (feeder) { // if feeder exists
      if (id) { // if Schedule ID provided
        return Schedule.findByPk(id)
          .then((schedule: Schedule | null) => {
            if (schedule) { // if Schedule exists with provided ID
              return schedule.update({ cron, duration });
            }

            return feeder.createSchedule({ id, cron, duration });
          })
          .then((schedule: Schedule) => {
            return schedule;
          });
      }

      return feeder.createSchedule({ cron, duration })
        .then((schedule: Schedule) => {
          return schedule;
        });
    }

    throw new Error(`Feeder with ID ${feederId} does not exist.`);
  });

const deleteSchedule = (id: number) => Schedule.findByPk(id).then((feeder: Schedule | null) => {
  if (!feeder) {
    throw new Error(`Schedule with ID ${id} does not exist.`);
  }

  return feeder.destroy();
});

export {
  getSchedule,
  getAllSchedules,
  upsertSchedule,
  deleteSchedule,
};
