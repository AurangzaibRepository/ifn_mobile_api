'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.changeColumn('donations', 'start_date', {
          type: Sequelize.DATEONLY
        }, { transaction }),
        
        queryInterface.changeColumn('donations', 'end_date', {
          type: Sequelize.DATEONLY
        }, { transaction })
      ])
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.changeColumn('donations', 'start_date', {
          type: Sequelize.DATE
        }, { transaction }),
        queryInterface.changeColumn('donations', 'end_date', {
          type: Sequelize.DATE
        }, { transaction })
      ])
    });
  }
};
