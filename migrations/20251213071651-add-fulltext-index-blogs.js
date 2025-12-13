'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.sequelize.query(
      'ALTER TABLE blogs ADD FULLTEXT(text)'
     );
  },

  async down (queryInterface, Sequelize) {}
};
