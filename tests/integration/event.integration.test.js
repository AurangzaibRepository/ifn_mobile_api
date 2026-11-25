const db = require('../../models');
const eventService = require('../../services/event.service');

describe('Event integration tests', () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should retrieve events from database', async () => {
        const user = await db.User.create({
            firstName: 'Demo',
            lastName: 'User',
            email: 'demouser@gmail.com'
        });

        const event = await db.Event.create({
            title: 'Test event',
            description: 'Test description',
            start_date: '2020-01-01',
            end_date: '2020-01-10',
            createdBy: user.id
        });

        const result = await eventService.getListing(1);

        expect(result.length).toBeGreaterThan(0);
        expect(result.some(item => item.id === event.id)).toBe(true);

        await event.destroy();
        await user.destroy();
    });
    
    it('should retrieve events with filter from database', async () => {
        const user = await db.User.create({
            firstName: 'Demo',
            lastName: 'User'
        });

        const event = await db.Event.create({
            title: 'Test event1',
            description: 'Test description',
            start_date: '2020-01-01',
            end_date: '2020-01-10',
            createdBy: user.id
        });

        const result = await eventService.getListing(1, 'event1');

        expect(result.length).toBeGreaterThan(0);
        expect(result.some(item => item.id === event.id)).toBe(true);

        await event.destroy();
        await user.destroy();
    });
});