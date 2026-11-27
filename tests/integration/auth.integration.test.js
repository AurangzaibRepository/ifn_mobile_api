const jwt = require('jsonwebtoken');
const db = require('../../models');
const authService = require('../../services/auth.service');

describe('Auth integration tests', () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should user login successfully', async () => {
        let user;

        try {
            user = await db.User.create({
                firstName: 'Demo',
                lastName: 'User',
                email: 'demouser@gmail.com'
            });

            const result = await authService.loginUser(user.email);
            const decoded = jwt.verify(result.token, process.env.JWT_SECRET);

            expect(result).not.toBeNull();
            expect(result.email).toBe(user.email);
            expect(result.email).toBe(decoded.email);

        } finally {
            if (user) await user.destroy();
        }
    });

    it('should user register successfully', async () => {
        let registeredUser;

        try {
            const data = {
                firstName: 'Demo',
                lastName: 'User',
                email: 'demouser@gmail.com'
            };

            const result = await authService.register(data, undefined);
            registeredUser = await db.User.findOne({
                where: {
                    email: data.email
                }
            });

            expect(registeredUser).not.toBeNull();
            expect(registeredUser.email).toBe(data.email);
            expect(result).not.toBeNull();
            expect(result.email).toBe(data.email);
            
        } finally {
            if (registeredUser) await registeredUser.destroy();
        }
    });
});