'use strict';
/** @type {import('sequelize-cli').Migration} */
const { BLOG_STATUS } = require('../enums/status.enum');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      banner: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      role: {
        defaultValue: BLOG_STATUS.DRAFT,
        type: Sequelize.ENUM(...Object.values(BLOG_STATUS))
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
    await queryInterface.dropTable('blogs');
  }
};