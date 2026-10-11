'use strict';
const {
  Model
} = require('sequelize');
const { USER_STATUS } = require('../enums/status.enum');
const formatUtil = require('../utils/formatter.util');
const activeStatus = USER_STATUS.ACIVE;

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      this.hasMany(models.DonationContribution, {
        foreignKey: 'donation_id'
      });
    }
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
      type: DataTypes.DATEONLY,
      get() {
        const rawValue = this.getDataValue('start_date');
        if (! rawValue) return null;

        return formatUtil.formatDate(rawValue);
      }
    },
    end_date: {
      type: DataTypes.DATEONLY,
      get() {
        const rawValue = this.getDataValue('end_date');
        if (! rawValue) return null;

        return formatUtil.formatDate(rawValue);
      }
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
      where: {
        status: activeStatus
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: [ ['createdAt', 'DESC'] ]
    }
  });

  return Donation;
};