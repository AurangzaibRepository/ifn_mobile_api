'use strict';
/** @type {import('sequelize-cli').Migration} */
const { USER_STATUS } = require('../enums/status.enum');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: Sequelize.TEXT,
      start_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_seats: Sequelize.INTEGER,
      seats_booked: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      status: {
        defaultValue: USER_STATUS.ACIVE,
        type: Sequelize.ENUM(...Object.values(USER_STATUS))
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
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
    await queryInterface.dropTable('events');
  }
};