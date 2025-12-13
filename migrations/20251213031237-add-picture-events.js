'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = 'events';
const columnName = 'picture';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING(100)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName);
  }
};
