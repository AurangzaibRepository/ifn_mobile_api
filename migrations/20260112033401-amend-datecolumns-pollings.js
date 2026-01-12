'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.changeColumn('pollings', 'start_date', {
          type: Sequelize.DATEONLY
        }, { transaction }),
        queryInterface.changeColumn('pollings', 'end_date', {
          type: Sequelize.DATEONLY
        }, { transaction })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.changeColumn('pollings', 'start_date', {
          type: Sequelize.DATE
        }),
        queryInterface.sequelize.changeColumn('pollings', 'end_date', {
          type: Sequelize.DATE
        })
      ]);
    });
  }
};
