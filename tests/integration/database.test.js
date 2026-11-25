const db = require('../../models');

describe('Database connection', () => {
    it('should connect to the test database successfully', async () => {
        await expect(db.sequelize.authenticate()).resolves.not.toThrow();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });
});