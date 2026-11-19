const db = require('../../models');
const donationService = require('../../services/donation.service');

beforeEach(() => {
    jest.clearAllMocks();
    process.env.PAGE_SIZE = '10';
});

jest.mock('../../models', () => ({
    Donation: {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        DonationContribution: {},
        User: {}
    }
}));

describe('findByAttribute', () => {
    it('Should return when provide attribute with value', async () => {
        db.Donation.findOne.mockResolvedValue({
            id: 1,
            title: 'Test donation'
        });

        const result = await donationService.findByAttribute('id', 1);

        expect(result).toEqual({
            id: 1,
            title: 'Test donation'
        });

        expect(db.Donation.findOne).toHaveBeenCalledWith({
            where: {
                id: 1
            }
        });
    });

    it('Should return null when data not found', async () => {
        db.Donation.findOne.mockResolvedValue(null);

        const result = await donationService.findByAttribute('id', 10);

        expect(result).toBeNull();
    });
});

describe('getListing', () => {
    it('Should return data', async () => {
        db.Donation.findAll.mockResolvedValue([{
            id: 1,
            title: 'Test donation 1'
        }, {
            id: 2,
            title: 'Test donation 2'
        }]);

        const result = await donationService.getListing(1);

        expect(result).toEqual([{
            id: 1,
            title: 'Test donation 1'
        }, {
            id: 2,
            title: 'Test donation 2'
        }]);

        expect(db.Donation.findAll).toHaveBeenCalledWith({
            limit: 10,
            offset: 0
        });
    });
});

describe('getDetails', () => {
    it('Should return details when donation found', async () => {
        db.Donation.findByPk.mockResolvedValue({
            id: 1,
            title: 'Test donation',
            user: {
                id: 1,
                first_name: 'John',
                last_name: 'Kane',
                email: 'john_kane@gmail.com'
            }
        });

        const result = await donationService.getDetails(1);

        expect(result).toEqual({
            id: 1,
            title: 'Test donation',
            user: {
                id: 1,
                first_name: 'John',
                last_name: 'Kane',
                email: 'john_kane@gmail.com'
            }
        });

        expect(db.Donation.findByPk).toHaveBeenCalledWith(1, {
            include: {
                model: db.DonationContribution,
                include: {
                    model: db.User,
                    attributes: ['first_name', 'last_name', 'email']
                }
            }
        });
    });

    it('Should return null when not donation found', async () => {
        db.Donation.findByPk.mockResolvedValue(null);

        const result = await donationService.getDetails(10);

        expect(result).toBeNull();
    });
});