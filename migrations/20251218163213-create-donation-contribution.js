'use strict';
/** @type {import('sequelize-cli').Migration} */
const { PAYMENT_STATUS } = require('../enums/status.enum');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('donation_contributions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('donation_contributions');
  }
};