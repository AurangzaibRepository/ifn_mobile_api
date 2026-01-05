'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.changeColumn('banquet_bookings', 'booking_date',  {
        type: Sequelize.DATEONLY
     });
  },

  async down (queryInterface, Sequelize) {}
};
