'use strict';
const { PAYMENT_STATUS } = require('../enums/status.enum');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('banquet_bookings', 'payment_status', {
      defaultValue: PAYMENT_STATUS.PENDING,
      type: Sequelize.ENUM(...Object.values(PAYMENT_STATUS))
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('banquet_bookings', 'payment_status');
  }
};
