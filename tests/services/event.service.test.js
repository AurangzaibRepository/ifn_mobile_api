const db = require('../../models');
const eventService = require('../../services/event.service');
const eventRegistrationService = require('../../services/event_registration.service');
const { USER_ROLES } = require('../../enums/roles.enum');

beforeEach(() => {
    jest.clearAllMocks();
    process.env.PAGE_SIZE = '10';
});

jest.mock('../../models', () => ({
    Event: {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        EventRegistration: {}
    },
    User: {
        create: jest.fn()
    }
}));

jest.mock('../../services/event_registration.service', () => ({
    createRegistration: jest.fn()
}));

describe('findByAttribute', () => {
    it('Should return data when found by id', async () => {
        db.Event.findOne.mockResolvedValue({
            id: 1,
            title: 'Test event'
        });

        const result = await eventService.findByAttribute('id', 1);

        expect(result).toEqual({
            id: 1,
            title: 'Test event'
        });

        expect(db.Event.findOne).toHaveBeenCalledWith({
            where: {
                id: 1
            }
        });
    });

    it('Should retutn null when no data found', async () => {
        db.Event.findOne.mockResolvedValue(null);

        const result = await eventService.findByAttribute('id', 1);

        expect(result).toBeNull();
    });
});

describe('getListing', () => {
    it('Should return donations without filter', async () => {
        db.Event.findAll.mockResolvedValue([{
            id: 1,
            title: 'Test event 1'
        }, {
            id: 2,
            title: 'Test event 2'
        }]);

        const result = await eventService.getListing(1, '');

        expect(result).toEqual([{
            id: 1,
            title: 'Test event 1'
        }, {
            id: 2,
            title: 'Test event 2'
        }]);

        expect(db.Event.findAll).toHaveBeenCalledWith({
            where: {},
            limit: 10,
            offset: 0
        });
    });
});

describe('getDetails', () => {
    it('Should return data when donation found by id', async () => {
        db.Event.findByPk.mockResolvedValue({
            toJSON: () => ({
                id: 1,
                title: 'Test event',
                EventRegistrations: [
                    {
                        id: 1,
                        User: {
                            first_name: 'John',
                            last_name: 'Khan',
                            email: 'john@example.com',
                            contact_number: '123456789',
                            picture: 'john.jpg'
                        }
                    }
                ]
            })
        });

        const result = await eventService.getDetails(1);

        expect(result).toEqual({
            id: 1,
            title: 'Test event',
            registrations: [
                {
                    first_name: 'John',
                    last_name: 'Khan',
                    email: 'john@example.com',
                    contact_number: '123456789',
                    picture: 'john.jpg'
                }
            ]
        });

        expect(db.Event.findByPk).toHaveBeenCalledWith(1, {
            include: {
                model: db.EventRegistration
            }
        });
    });

    it('Should return null when no donation found', async () => {
        db.Event.findByPk.mockResolvedValue(null);

        const result = await eventService.getDetails(1);

        expect(result).toBeNull();
    });
});

describe('register', () => {
    it('Should register event with provided userid', async () => {
       await eventService.register({
        event_id: 10,
        user_id: 5
       });

       expect(eventRegistrationService.createRegistration)
        .toHaveBeenCalledWith({
            event_id: 10,
            user_id: 5
        });
    });

    it('Should register event without userid', async () => {
        db.User.create.mockResolvedValue({
            id: 1
        });

        await eventService.register({
            event_id: 10,
            first_name: 'John',
            email: 'john@gmail.com'
        });

        expect(db.User.create).toHaveBeenCalledWith({
            first_name: 'John',
            email: 'john@gmail.com',
            role: USER_ROLES.USER
        });
    
        expect(eventRegistrationService.createRegistration)
            .toHaveBeenCalledWith({
                event_id: 10,
                user_id: 1
            });
    });
});

