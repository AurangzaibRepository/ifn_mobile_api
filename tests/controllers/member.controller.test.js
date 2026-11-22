const memberController = require('../../controllers/member.controller');
const memberService = require('../../services/member.service');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../services/member.service', () => ({
    getListing: jest.fn(),
    getDetails: jest.fn()
}));

describe('listing', () => {
    it('Should return member listing successfully', async () => {
        const req = {
            params: {
                pageNumber: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const members = [{
            id: 1,
            first_name: 'Demo',
            last_name: 'User',
            email: 'demouser@gmail.com'
        }, {
            id: 2,
            first_name: 'Demo',
            last_name: 'User2',
            email: 'demouser2@gmail.com'
        }];

        memberService.getListing.mockResolvedValue(members);
        await memberController.listing(req, res);

        expect(memberService.getListing).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: members
        });
    });
});

describe('details', () => {
    it('Should return member successfully', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const member = {
            id: 1,
            first_name: 'Demo',
            last_name: 'User',
            email: 'demouser@gmail.com'
        };

        memberService.getDetails.mockResolvedValue(member);
        await memberController.details(req, res);

        expect(memberService.getDetails).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: member
        });
    });
});