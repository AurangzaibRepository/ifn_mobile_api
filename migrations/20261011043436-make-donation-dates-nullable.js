
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('donations', 'start_date', {
            type: Sequelize.DATE,
            allowNull: true
        });

        await queryInterface.changeColumn('donations', 'end_date', {
            type: Sequelize.DATE,
            allowNull: true
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('donations', 'start_date', {
            type: Sequelize.DATE,
            allowNull: false
        });

        await queryInterface.changeColumn('donations', 'end_date', {
            type: Sequelize.DATE,
            allowNull: false
        });
    }
};