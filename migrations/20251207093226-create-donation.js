'use strict';
const { USER_STATUS } = require('../enums/status.enum');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(80)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      goal: {
        allowNull: false,
        type: Sequelize.DECIMAL(8,2)
      },
      total_contribution: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(8,2)
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        defaultValue: USER_STATUS.ACIVE,
        type: Sequelize.ENUM(...Object.values(USER_STATUS))
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('donations');
  }
};