'use strict';

/** @type {import('sequelize-cli').Migration} */
const TABLE_NAME = 'events';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(TABLE_NAME, 'start_date', {
      type: Sequelize.DATEONLY
    });

    await queryInterface.changeColumn(TABLE_NAME, 'end_date', {
      type: Sequelize.DATEONLY
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(TABLE_NAME, 'start_date', {
      type: Sequelize.DATE
    });

    await queryInterface.changeColumn(TABLE_NAME, 'end_date', {
      type: Sequelize.STRING
    });
  }
}; 
