'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PollingVote extends Model {
    static associate(models) {
      // define association here
    }
  }

  PollingVote.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    participant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'polling_participants',
        key: 'id'
      }
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
    modelName: 'PollingVote',
    tableName: 'polling_votes',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return PollingVote;
};