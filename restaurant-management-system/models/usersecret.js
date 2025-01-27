'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSecret extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSecret.init({
    user_id: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserSecret',
  });
  return UserSecret;
};