'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'picture', {
      type: Sequelize.STRING(500)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'picture');
  }
};
