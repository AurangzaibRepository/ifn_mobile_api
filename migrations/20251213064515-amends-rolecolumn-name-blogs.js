'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = 'blogs';
const currentColumn = 'role';
const newColumn = 'status';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(tableName, currentColumn, newColumn);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(tableName, newColumn, currentColumn);
  }
};
