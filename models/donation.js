'use strict';
const {
  Model
} = require('sequelize');
const { USER_STATUS } = require('../enums/status.enum');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {}
  }

  Donation.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    goal: {
      allowNull: false,
      type: DataTypes.DECIMAL(8,2)
    },
    total_contribution: {
      allowNull: false,
      type: DataTypes.DECIMAL(8,2)
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    status: {
      defaultValue: USER_STATUS.ACIVE,
      type: DataTypes.ENUM(...Object.values(USER_STATUS))
    }
  }, {
    sequelize,
    modelName: 'Donation',
    tableName: 'donations',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: [ ['createdAt', 'DESC'] ]
    }
  });

  return Donation;
};