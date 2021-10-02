import { Sequelize } from 'sequelize';
import Feeder from './feeder';
import Log from './log';
import Schedule from './schedule';

const register = async (database: Sequelize) => {
  await Feeder.register(database);
  await Log.register(database);
  await Schedule.register(database);

  await Feeder.hasMany(Schedule, { sourceKey: 'id', foreignKey: 'feederId' });
  await Feeder.hasMany(Log, { sourceKey: 'id', foreignKey: 'feederId' });
  await Schedule.belongsTo(Feeder);
  await Log.belongsTo(Feeder);
};

export default { register };
