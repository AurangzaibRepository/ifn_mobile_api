'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('banquet_bookings', 'receipt_url', {
      type: Sequelize.STRING(700)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('banquet_bookings', 'receipt_url');
  }
};
