'use strict';
const {
  Model
} = require('sequelize');
const { PAYMENT_STATUS } = require('../enums/status.enum');
const formatUtil = require('../utils/formatter.util');

module.exports = (sequelize, DataTypes) => {
  class DonationContribution extends Model {
    static associate(models) {
      this.belongsTo(models.Donation, {
        'foreignKey': 'donation_id'
      });

      this.belongsTo(models.User, {
        'foreignKey': 'user_id' 
      });
    }
  }

  DonationContribution.init({
    donation_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'donations',
        key: 'id'
      }
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(6,2)
    },
    payment_ref_id: {
      type: DataTypes.STRING(50)
    },
    payment_status: {
      defaultValue: PAYMENT_STATUS.PENDING,
      type: DataTypes.ENUM(...Object.values(PAYMENT_STATUS))
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    currency: {
      type: DataTypes.STRING(20)
    },
    payment_intent: {
      type: DataTypes.STRING(200)
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue('createdAt');
        if (! rawValue) return null;

        return formatUtil.formatDate(rawValue);
      }
    }
  }, {
    sequelize,
    modelName: 'DonationContribution',
    tableName: 'donation_contributions',
    defaultScope: {
      attributes: {
        exclude: ['updatedAt']
      }
    }
  });

  return DonationContribution;
};