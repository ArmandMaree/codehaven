import {
  INTEGER,
  STRING,
  Sequelize,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';

import Schedule from './schedule';
import Log from './log';

interface FeederAttributes {
  id: number;
  name: string;
  defaultDuration: number;
}

interface FeederCreationAttributes extends Optional<FeederAttributes, 'id'> {}

class Feeder extends Model<FeederAttributes, FeederCreationAttributes> implements FeederAttributes {
  static sequelize: Sequelize;

  public id!: number;
  public name!: string;
  public defaultDuration!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getSchedules!: HasManyGetAssociationsMixin<Schedule>; // Note the null assertions!
  public addSchedule!: HasManyAddAssociationMixin<Schedule, number>;
  public hasSchedule!: HasManyHasAssociationMixin<Schedule, number>;
  public countSchedules!: HasManyCountAssociationsMixin;
  public createSchedule!: HasManyCreateAssociationMixin<Schedule>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly schedules?: Schedule[]; // Note this is optional since it's only populated when explicitly requested in code

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getLogs!: HasManyGetAssociationsMixin<Log>; // Note the null assertions!
  public addLog!: HasManyAddAssociationMixin<Log, number>;
  public hasLog!: HasManyHasAssociationMixin<Log, number>;
  public countLogs!: HasManyCountAssociationsMixin;
  public createLog!: HasManyCreateAssociationMixin<Log>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly logs?: Log[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    schdules: Association<Feeder, Schedule>;
    logs: Association<Feeder, Log>;
  };

  static async register(_sequelize: Sequelize) {
    Feeder.sequelize = _sequelize;

    if (Feeder.sequelize) {
      return Feeder.init({
        id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: STRING,
          allowNull: false,
        },
        defaultDuration: {
          type: INTEGER,
          allowNull: false,
        },
      }, {
        timestamps: true,
        sequelize: Feeder.sequelize,
        paranoid: true,
      });
    }

    return Promise.resolve();
  }
}

export default Feeder;
