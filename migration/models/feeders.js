const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feeders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feeders.init({
    name: DataTypes.STRING,
    defaultDuration: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Feeders',
    timestamps: true,
  });
  return Feeders;
};
