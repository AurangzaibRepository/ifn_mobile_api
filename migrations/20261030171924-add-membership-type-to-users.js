'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'membership_type', {
      type: Sequelize.STRING(50), // Adjust the length/data type as needed (e.g., STRING, ENUM)
      allowNull: true,            // Makes it nullable
      defaultValue: null          // Optional default value
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'membership_type');
  }
};