'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppService extends Model {}

  AppService.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING(80),
    },
    descripton: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    banner: DataTypes.STRING(300),
  }, {
    sequelize,
    modelName: 'AppService',
    tableName: 'app_services',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
   
  return AppService;
};