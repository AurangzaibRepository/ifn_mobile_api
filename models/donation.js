'use strict';
const {
  Model
} = require('sequelize');
const { USER_STATUS } = require('../enums/status.enum');
const formatUtil = require('../utils/formatter.util');

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
      defaultValue: 0,
      type: DataTypes.DECIMAL(8,2)
    },
    start_date: {
      type: DataTypes.DATEONLY,
      get() {
        const rawValue = this.getDataValue('start_date');
        return rawValue ? formatUtil.formatDate(rawValue) : null;
      }
    },
    end_date: {
      type: DataTypes.DATEONLY,
      get() {
        const rawValue = this.getDataValue('end_date');
        return rawValue ? formatUtil.formatDate(rawValue) : null;
      }
    },
    status: {
      defaultValue: USER_STATUS.ACIVE,
      type: DataTypes.ENUM(...Object.values(USER_STATUS))
    },
    picture: {
      type: DataTypes.STRING(100),
      get() {
        const fileName = this.getDataValue('picture');
        if (!fileName) return null;

        if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
          return fileName;
        }

        const baseUrl = (process.env.BASE_URL || process.env.AWS_BASE_URL || '').replace(/\/+$/, '');
        return `${baseUrl}/public/images/donations/${fileName}`;
      }
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