'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.sequelize.query(
      'ALTER TABLE events ADD FULLTEXT(description)'
     );
  },

  async down (queryInterface, Sequelize) {}
};
