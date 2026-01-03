'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('donation_contributions', 'payment_intent_id', {
      type: Sequelize.STRING(100)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('donation_contributions', 'payment_intent_id');
  }
};
