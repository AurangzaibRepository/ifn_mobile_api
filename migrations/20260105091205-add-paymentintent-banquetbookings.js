'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn('banquet_bookings', 'payment_intent', {
        type: Sequelize.STRING(200),
      }, { transaction });

      await queryInterface.addColumn('banquet_bookings', 'payment_intent_id', {
        type: Sequelize.STRING(100)
      }, { transaction });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('banquet_bookings', 'payment_intent', { transaction });
      await queryInterface.removeColumn('banquet_bookings', 'payment_intent_id', { transaction });
    });
  }
};
