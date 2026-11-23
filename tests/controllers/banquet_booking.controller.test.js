const banquetbookingController = require('../../controllers/banquet_booking.controller');
const banquetBookingService = require('../../services/banquet_booking.service');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../services/banquet_booking.service', () => ({
    getListing: jest.fn(),
    createRecord: jest.fn()
}));

describe('listing', () => {
    it('Should return banquet bookings successfully', async () => {
        const req = {
            params: {
                userId: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const bookings = [{
            id: 1,
            title: 'Test booking',
            description: 'Test description',
            booking_date: '2026-01-10',
            user_id: 1
        }, {
            id: 2,
            title: 'Test booking2',
            description: 'Test description2',
            booking_date: '2026-01-10',
            user_id: 1
        }];

        banquetBookingService.getListing.mockResolvedValue(bookings);

        await banquetbookingController.listing(req, res);

        expect(banquetBookingService.getListing).toHaveBeenCalledWith(req.params.userId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: bookings
        });
    });
});

describe('create', () => {
    it('Should booking created successfully', async () => {
        const req = {
            body: {
                title: 'Test booking 1',
                description: 'Test booking description',
                booking_data: '2026-01-10',
                userId: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await banquetbookingController.create(req, res);

        expect(banquetBookingService.createRecord).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: 'Booking created successfully'
        });
    });
});