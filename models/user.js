'use strict';
const {
  Model
} = require('sequelize');
const { USER_ROLES } = require('../enums/roles.enum');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    contact_number: DataTypes.STRING(50),
    street_address: DataTypes.STRING(150),
    city: DataTypes.STRING(100),
    state: DataTypes.STRING(100),
    postal_code: DataTypes.INTEGER,
    role: DataTypes.ENUM(...Object.values(USER_ROLES)),
    status: {
      defaultValue: USER_STATUS.ACIVE,
      type: DataTypes.ENUM(...Object.values(USER_STATUS))
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return User;
};