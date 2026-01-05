'use strict';
/** @type {import('sequelize-cli').Migration} */
const { BOOKING_STATUS } = require('../enums/status.enum');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banquet_bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: Sequelize.TEXT,
      booking_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      guest_count: Sequelize.INTEGER,
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: {
        defaultValue: BOOKING_STATUS.PENDING,
        type: Sequelize.ENUM(...Object.values(BOOKING_STATUS))
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
    await queryInterface.dropTable('banquet_bookings');
  }
};