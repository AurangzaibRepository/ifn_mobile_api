'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
        ALTER TABLE event_registrations
        DROP COLUMN first_name,
        DROP COLUMN last_name,
        DROP COLUMN email,
        DROP COLUMN contact_number;
      `);
  },

  async down (queryInterface, Sequelize) {}
};
