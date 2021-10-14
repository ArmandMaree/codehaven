import {
  Sequelize, Model, INTEGER, STRING, Optional, NUMBER,
} from 'sequelize';

interface ScheduleAttributes {
  id: number;
  cron: string;
  duration: number;
}

interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, 'id'> { }

export default class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
  static sequelize: Sequelize;

  public id!: number;
  public cron!: string;
  public duration!: number;
  public FeederId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static async register(_sequelize: Sequelize) {
    Schedule.sequelize = _sequelize;

    if (Schedule.sequelize) {
      return Schedule.init({
        id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        cron: {
          type: STRING,
          allowNull: false,
        },
        duration: {
          type: NUMBER,
          allowNull: false,
        },
      }, {
        timestamps: true,
        sequelize: Schedule.sequelize,
        paranoid: true,
      });
    }

    return Promise.resolve();
  }
}
