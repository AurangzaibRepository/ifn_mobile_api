'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Polling extends Model {
    static associate(models) {
      Polling.hasMany(models.PollingParticipant, {
        foreignKey: 'polling_id'
      });

      Polling.belongsTo(models.PollingParticipant, {
        foreignKey: 'winner_participant_id'
      });
    }
  }

  Polling.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    total_votes:{
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    winner_participant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'polling_participants',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Polling',
    tableName: 'pollings',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return Polling;
};