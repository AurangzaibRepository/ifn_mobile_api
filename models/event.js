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
    total_seats: Sequelize.INTEGER,
    seats_booked: {
      defaultValue: 0,
      type: Sequelize.INTEGER
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
    tableName: 'events',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return Event;
};