'use strict';
const {
  Model
} = require('sequelize');
const { BOOKING_STATUS, PAYMENT_STATUS } = require('../enums/status.enum');
const formatUtil = require('../utils/formatter.util');

module.exports = (sequelize, DataTypes) => {
  class BanquetBooking extends Model {
    static associate(models) {
      // define association here
    }
  }

  BanquetBooking.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: DataTypes.TEXT,
    booking_date: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue('booking_date');

        return rawValue ? formatUtil.formatDate(rawValue) : null;
      }
    },
    guest_count: DataTypes.INTEGER,
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    payment_intent: DataTypes.STRING(200),
    payment_intent_id: DataTypes.STRING(100),
    receipt_url: DataTypes.STRING(700),
    payment_status: {
      defaultValue: PAYMENT_STATUS.PENDING,
      type: DataTypes.ENUM(...Object.values(PAYMENT_STATUS))
    },
    status: {
      defaultValue: BOOKING_STATUS.PENDING,
      type: DataTypes.ENUM(...Object.values(BOOKING_STATUS))
    },
  }, {
    sequelize,
    modelName: 'BanquetBooking',
    tableName: 'banquet_bookings',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: [ ['id', 'DESC'] ]
    }
  });

  return BanquetBooking;
};