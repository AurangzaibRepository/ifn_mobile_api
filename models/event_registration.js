'use strict';
const {
  Model
} = require('sequelize');
const db = require('../models');

module.exports = (sequelize, DataTypes) => {
  class EventRegistration extends Model {
    static associate(models) {
      EventRegistration.belongsTo(models.Event, {
        foreignKey: 'event_id'
      });

      EventRegistration.belongsTo(models.User, {
        foreignKey: 'user_id',
      });

      // If we need to add association, have to define here since models are loaded here
      EventRegistration.addScope('defaultScope', {
        include: [{
          model: models.User
        }]
      });
    }

    toJSON() {
      const data = { ...this.get() }
      delete data.createdAt;
      delete data.updatedAt;
      delete data.user_id;
    }
  }

  EventRegistration.init({
    event_id: {
      allowNull: false,
       type: DataTypes.INTEGER,
       references: {
        model: 'events',
        key: 'id'
       }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'EventRegistration',
    tableName: 'event_registrations'
  });

  return EventRegistration;
};