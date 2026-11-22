const authController = require('../../controllers/auth.controller');
const authService = require('../../services/auth.service');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../services/auth.service', () => ({
    loginUser: jest.fn(),
    register: jest.fn()
}));

describe('login', () => {
    it('Should user login successfully', async () => {
        const req = {
            body: {
                email: 'demouser@gmail.com'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        authService.loginUser.mockResolvedValue({
            id: 1,
            email: req.body.email,
            name: `Demo User`
        });
        await authController.login(req, res);

        expect(authService.loginUser).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: {
                id: 1,
                email: req.body.email,
                name: `Demo User`
            }
        });
    });
});