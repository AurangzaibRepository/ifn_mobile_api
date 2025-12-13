'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = 'event_registrations';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Since its mysql, multple DDL statements are not safe, so use them all in one go
    await queryInterface.sequelize.query(`
        ALTER TABLE event_registrations
          MODIFY COLUMN first_name VARCHAR(50) NULL,
          MODIFY COLUMN last_name VARCHAR(50) NULL,
          MODIFY COLUMN email VARCHAR(100) NULL
      `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        ALTER TABLE event_registrations
        MODIFY COLUMN first_name VARCHAR(50) NOT NULL,
        MODIFY COLUMN last_name VARCHAR(50) NOT NULL,
        MODIFY COLUMN email VARCHAR(100) NOT NULL
      `);
  }
};
