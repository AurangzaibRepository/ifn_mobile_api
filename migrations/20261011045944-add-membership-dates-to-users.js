
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'membership_registration_date', {
            type: Sequelize.DATEONLY,
            allowNull: true
        });

        await queryInterface.addColumn('users', 'membership_expiry_date', {
            type: Sequelize.DATEONLY,
            allowNull: true
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('users', 'membership_expiry_date');
        await queryInterface.removeColumn('users', 'membership_registration_date');
    }
};