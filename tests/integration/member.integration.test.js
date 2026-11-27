const { USER_ROLES } = require('../../enums/roles.enum');
const db = require('../../models');
const memberService = require('../../services/member.service');

describe('Member integration tests', () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should return members successfully', async () => {
        let user, result;

        try {
            user = await db.User.create({
                first_name: 'Demo',
                last_name: 'User',
                email: 'demouser@gmail.com',
                role: USER_ROLES.MEMBER
            });

            result = await memberService.getListing(1);

            expect(result).not.toBeNull();
            expect(result.some(item => item.id === user.id)).toBe(true);
        } finally {
            if (user) await user.destroy();
        }
    });
});