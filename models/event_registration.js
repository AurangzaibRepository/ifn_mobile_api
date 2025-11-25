'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventRegistration extends Model {
    static associate(models) {
      EventRegistration.belongsTo(models.Event, {
        foreignKey: 'event_id'
      });

      EventRegistration.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
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
    first_name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    contact_number: DataTypes.STRING(50),
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
    tableName: 'event_registrations',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return EventRegistration;
};