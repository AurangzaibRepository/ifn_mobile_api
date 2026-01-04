'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('donation_contributions', 'receipt_url', {
      type: Sequelize.STRING(700)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('donation_contributions', 'receipt_url');
  }
};
