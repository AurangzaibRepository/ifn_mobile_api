'use strict';
const {
  Model
} = require('sequelize');
const { USER_STATUS } = require('../enums/status.enum');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: 'createdBy'
      });

      Event.hasMany(models.EventRegistration, {
        foreignKey: 'event_id'
      });
    }

    toJSON() {
      const data = { ...this.get() };
      delete data.createdAt;
      delete data.updatedAt;
      delete data.createdBy;

      return data;
    }
  }

  Event.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: DataTypes.TEXT,
    start_date: {
      allowNull:false,
      type: DataTypes.DATE
    },
    end_date: {
      allowNull: false,
      type: DataTypes.STRING
    },
    total_seats: DataTypes.INTEGER,
    seats_booked: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    status: {
      defaultValue: USER_STATUS.ACTIVE,
      type: DataTypes.ENUM(...Object.values(USER_STATUS))
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events'
  });

  return Event;
};