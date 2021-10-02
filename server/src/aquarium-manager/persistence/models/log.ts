import {
  Sequelize, Model, INTEGER, ENUM, NOW, DATE, STRING, Optional,
} from 'sequelize';

interface LogAttributes {
  id: number;
  timestamp: Date;
  duration: number;
  actor: string;
  status: string;
  message: string | null | undefined;
}

interface LogCreationAttributes extends Optional<LogAttributes, 'id' | 'timestamp' | 'message'> {}

class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
  static sequelize: Sequelize;

  public id!: number;
  public timestamp!: Date;
  public duration!: number;
  public actor!: string;
  public status!: string;
  public message!: string | null | undefined;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static async register(_sequelize: Sequelize) {
    Log.sequelize = _sequelize;

    if (Log.sequelize) {
      return Log.init({
        id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        timestamp: {
          type: DATE,
          defaultValue: NOW,
          allowNull: false,
        },
        duration: {
          type: INTEGER,
          allowNull: false,
        },
        actor: {
          type: ENUM,
          values: ['Actor', 'Manual'],
          allowNull: false,
        },
        status: {
          type: ENUM,
          values: ['Success', 'Failure'],
          allowNull: false,
        },
        message: {
          type: STRING,
          allowNull: true,
        },
      }, {
        timestamps: true,
        sequelize: Log.sequelize,
        paranoid: true,
      });
    }

    return Promise.resolve();
  }
}

export default Log;
