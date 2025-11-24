'use strict';
/** @type {import('sequelize-cli').Migration} */
const { USER_ROLES } = require('../enums/roles.enum');
const { USER_STATUS } = require('../enums/status.enum');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(50)
      },
      last_name: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      contact_number: {
        type: Sequelize.STRING(50)
      },
      street_address: {
        type: Sequelize.STRING(150)
      },
      city: {
        type: Sequelize.STRING(100)
      },
      state: {
        type: Sequelize.STRING(100)
      },
      postal_code: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM(...Object.values(USER_ROLES))
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
    await queryInterface.dropTable('users');
  }
};