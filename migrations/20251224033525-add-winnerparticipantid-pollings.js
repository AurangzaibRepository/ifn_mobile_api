'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = 'pollings';
const columnName = 'winner_participant_id';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.INTEGER,
      references: {
        model: 'polling_participants',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName);
  }
};
