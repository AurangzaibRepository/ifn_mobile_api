const memberController = require('../../controllers/member.controller');
const memberService = require('../../services/member.service');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../services/member.service', () => ({
    getListing: jest.fn(),
    getDetails: jest.fn(),
    makeMember: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn()
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

describe('becomeMember', () => {
    it('Member became successfully', async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                spouse_name: 'Demo'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await memberController.becomeMember(req, res);
        expect(memberService.makeMember).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: 'Member became successfully'
        });
    });
});

describe('save', () => {
    it('Should create user successfully', async () => {
        const req = {
            body: {
                first_name: 'Demo',
                last_name: 'user',
                email: 'demouser@gmail.com'
            },
            fileName: 'user.jpeg'
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        memberService.createUser.mockResolvedValue({
            id: 1,
            ...req.body
        });
        await memberController.save(req, res);
        
        expect(memberService.createUser).toHaveBeenCalledWith(req.body, 'user.jpeg');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: 'Member saved successfully',
            data: {
                id: 1,
                ...req.body
            }
        });
    });
});

describe('update', () => {
    it('Should user update successfully', async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                first_name: 'Demo',
                last_name: 'User',
                email: 'demouser@gmail.com'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await memberController.update(req, res);
        expect(memberService.updateUser).toHaveBeenCalledWith(req.params.id, req.body, undefined);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: 'Member updated successfully'
        });
    });
});