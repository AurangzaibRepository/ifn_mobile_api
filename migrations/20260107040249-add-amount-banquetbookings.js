'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('banquet_bookings', 'amount', {
      type: Sequelize.DECIMAL(6,2)
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('banquet_bookings', 'amount');
  }
};
