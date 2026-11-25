const donationController = require('../../controllers/donation.controller');
const donationService = require('../../services/donation.service');
const donationContributionService = require('../../services/donation_contribution.service');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../services/donation.service', () => ({
    getListing: jest.fn(),
    getDetails: jest.fn()
}));

jest.mock('../../services/donation_contribution.service', () => ({
    makeDonation: jest.fn()
}));

describe('listing', () => {
    it('Should return donation list successfully', async () => {
        const req = {
            params: {
                pageNumber: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const donations = [{
            id: 1,
            title: 'Test donation 1',
            description: 'Test donation 1 description'
        }, {
            id: 2,
            title: 'Test donation 2',
            description: 'Test donation 2 description'
        }];

        donationService.getListing.mockResolvedValue(donations);
        await donationController.listing(req, res);

        expect(donationService.getListing).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: donations
        });
    });
});

describe('details', () => {
    it('Should return donation successfully', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const donation = {
            id: 1,
            title: 'Test donation 1',
            description: 'Test donation 1 description'
        };

        donationService.getDetails.mockResolvedValue(donation);
        await donationController.details(req, res);

        expect(donationService.getDetails).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: donation
        });
    });
});

describe('donate', () => {
    it('donation made successfully', async () => {
        const req = {
            body: {
                donation_id: 1,
                amount: 10,
                first_name: 'Demo',
                last_name: 'User',
                email: 'demouser@gmail.com'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await donationController.donate(req, res);

        expect(donationContributionService.makeDonation).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: 'Donation made successfully'
        });
    });
});