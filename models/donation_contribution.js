'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DonationContribution extends Model {
    static associate(models) {
      this.belongsTo(models.Donation, {
        'foreignKey': 'donation_id'
      });
    }
  }

  DonationContribution.init({
    donation_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'donations',
        key: 'id'
      }
    },
    amount: {
      allowNull: false,
      type: Sequelize.DECIMAL(6,2)
    },
    payment_ref_id: {
      type: Sequelize.STRING(50)
    },
    payment_status: {
      defaultValue: PAYMENT_STATUS.PENDING,
      type: Sequelize.ENUM(...Object.values(PAYMENT_STATUS))
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    currency: {
      type: Sequelize.STRING(20)
    },
  }, {
    sequelize,
    modelName: 'DonationContribution',
    tableName: 'donation_contributions',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });

  return DonationContribution;
};