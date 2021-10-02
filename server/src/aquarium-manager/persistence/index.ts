import { Sequelize } from 'sequelize';
import Models from './models';
import logger from '../../logger';

let sequelize: Sequelize;

const register = (): Promise<void> => {
  logger.info(`MYSQL_HOST: ${process.env.MYSQL_HOST}`);
  logger.info(`MYSQL_USERNAME: ${process.env.MYSQL_USERNAME}`);

  const dbName = process.env.NODE_ENV === 'production' ? 'dbaquariummanager' : 'dbaquariummanager_test';

  if (!sequelize) {
    sequelize = new Sequelize(dbName,
      String(process.env.MYSQL_USERNAME),
      String(process.env.MYSQL_PASSWORD),
      {
        dialect: 'mysql',
        host: String(process.env.MYSQL_HOST),
        logging: (msg) => logger.debug(msg),
      });

    return Models.register(sequelize)
      .then(() => sequelize.sync()) // { force: true, match: /_test$/ }
      .then(() => {
        logger.info('All models were synchronized successfully.');
      });
  }

  return Promise.resolve();
};

export default {
  register,
};
