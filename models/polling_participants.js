'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PollingParticipant extends Model {
    static associate(models) {
      PollingParticipant.belongsTo(models.Polling, {
        foreignKey: 'polling_id'
      });

      PollingParticipant.hasMany(models.PollingVote, {
        foreignKey: 'participant_id'
      });
    }
  }

  PollingParticipant.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    email: DataTypes.STRING(100),
    vote_count: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    polling_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'pollings',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'PollingParticipant',
    tableName: 'polling_participants',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return PollingParticipant;
};