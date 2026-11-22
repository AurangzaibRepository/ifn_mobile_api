const eventController = require('../../controllers/event.controller');
const eventService = require('../../services/event.service');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../services/event.service', () => ({
    getListing: jest.fn(),
    getDetails: jest.fn(),
    register: jest.fn()
}));

describe('listing', () => {
    it('Should return event listing successfully', async () => {
        const req = {
            params: {
                pageNumber: 1
            },
            query: {
                keyword: 'test'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const events = [{
            id: 1,
            title: 'Test event1'
        }, {
            id: 2,
            title: 'Test event2'
        }];

        eventService.getListing.mockResolvedValue(events);

        await eventController.listing(req, res);

        expect(eventService.getListing).toHaveBeenCalledWith(1, 'test');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: events
        });
    });
});

describe('details', () => {
    it('Should return event successfully', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const event = {
            id: 1,
            title: 'Test event1'
        };

        eventService.getDetails.mockResolvedValue(event);
        await eventController.details(req, res);

        expect(eventService.getDetails).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: event
        });
    });
});

describe('register', () => {
    it('event registered successfully', async () => {
        const req = {
            body: {
                event_id: 1,
                first_name: 'Demo',
                last_name: 'User',
                email: 'demouser@gmail.com',
                contact_number: '00921312312122'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const data = {
            event_id: 1,
            first_name: 'Demo',
            last_name: 'User',
            email: 'demouser@gmail.com',
            contact_number: '00921312312122'
        };

        await eventController.register(req, res);
        
        expect(eventService.register).toHaveBeenCalledWith(data);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: 'Registration completed successfully'
        });
    });
});