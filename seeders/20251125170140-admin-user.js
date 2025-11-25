'use strict';
const { USER_ROLES } = require('../enums/roles.enum');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [adminUser] = await queryInterface.sequelize.query(
      `select id from users where email='admin_user@ifn.com'`
    );

    if (adminUser.length > 0) {
      console.log('Admin user already exists -- skipping seeder');
      return;
    }

    await queryInterface.bulkInsert('users', [{
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin_user@ifn.com',
      role: USER_ROLES.ADMIN,
      password: await bcrypt.hash('admin_ifn', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {}
};
