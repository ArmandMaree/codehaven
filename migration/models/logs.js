const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Logs.belongsTo(models.Feeders);
    }
  }
  Logs.init({
    timestamp: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    actor: DataTypes.STRING,
    status: DataTypes.STRING,
    message: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Logs',
    timestamps: true,
  });
  return Logs;
};
