const db = require('../../models');
const eventService = require('../../services/event.service');
const userService = require('../../services/member.service');

describe('Event integration tests', () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should retrieve events from database', async () => {
        let user, event;

        try {
            user = await db.User.create({
                firstName: 'Demo',
                lastName: 'User',
                email: 'demouser@gmail.com'
            });

            event = await db.Event.create({
                title: 'Test event',
                description: 'Test description',
                start_date: '2020-01-01',
                end_date: '2020-01-10',
                createdBy: user.id
            });

            const result = await eventService.getListing(1);

            expect(result.length).toBeGreaterThan(0);
            expect(result.some(item => item.id === event.id)).toBe(true);
        } finally {
            if (event) await event.destroy();
            if (user) await user.destroy();
        }
    });
    
    it('should retrieve events with filter from database', async () => {
        let user, event;

        try {
            user = await db.User.create({
                firstName: 'Demo',
                lastName: 'User'
            });

            event = await db.Event.create({
                title: 'Test event1',
                description: 'Test description',
                start_date: '2020-01-01',
                end_date: '2020-01-10',
                createdBy: user.id
            });

            const result = await eventService.getListing(1, 'event1');

            expect(result.length).toBeGreaterThan(0);
            expect(result.some(item => item.id === event.id)).toBe(true);
        } finally {
            if (event) await event.destroy();
            if (user) await user.destroy();
        }
    });

    it('should retrieve event details from database', async () => {
        let user, event;

        try {
            user = await db.User.create({
                firstName: 'Demo',
                lastName: 'User'
            });

            event = await db.Event.create({
                title: 'Test event1',
                description: 'Test description',
                start_date: '2020-01-01',
                end_date: '2020-01-10',
                createdBy: user.id
            });

            const result = await eventService.getDetails(event.id);

            expect(result).not.toBe(null);
            expect(result.title).toBe('Test event1');
        } finally {
            if (event) await event.destroy();
            if (user) await user.destroy();
        }
    });

    it('should register an event without user_id provided', async () => {
        let user, event, registeredUser, eventRegistration;
        
        try {
            user = await db.User.create({
                firstName: 'Demo',
                lastName: 'User'
            });

            event = await db.Event.create({
                title: 'Test event1',
                description: 'Test description',
                start_date: '2020-01-01',
                end_date: '2020-01-10',
                createdBy: user.id
            });

            const data = {
                event_id: event.id,
                first_name: 'test',
                last_name: 'user',
                email: 'testuser@gmail.com',
                contact_number: '0092312312'
            };

            await eventService.register(data);

            registeredUser = await userService.findByAttribute('email', data.email);
            eventRegistration = await db.EventRegistration.findOne({
                where: { user_id: registeredUser.id, event_id: event.id }
            });
            expect(registeredUser).not.toBeNull();
            expect(registeredUser.email).toBe(data.email);
            expect(eventRegistration).not.toBeNull();
        } finally {
            if (eventRegistration) await eventRegistration.destroy();
            if (event) await event.destroy();
            if (user) await user.destroy();
            if (registeredUser) await registeredUser.destroy();
        }
    });
});