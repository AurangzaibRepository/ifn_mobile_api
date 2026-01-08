'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        CREATE TRIGGER before_banquet_bookings_update
        BEFORE UPDATE ON banquet_bookings
        FOR EACH ROW
        BEGIN
          IF NEW.payment_status <> OLD.payment_status THEN
            IF NEW.payment_status = 'Success' THEN
              SET NEW.status = 'Confirmed';
            ELSEIF NEW.payment_status = 'Failed' THEN
              SET NEW.status = 'Cancelled';
            END IF;
          END IF;
        END;
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        DROP TRIGGER IF EXISTS before_banquet_bookings_update;
      `);
  }
};
