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

describe('register', () => {
    it('Should user register successfully', async () => {
        const req = {
            body: {
                first_name: 'Demo',
                last_name: 'User',
                email: 'demouser@gmail.com',
                phone_number: '009231231231'
            },
            fileName: 'user.jpeg'
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await authService.register(req, res);

        expect(authService.register).toHaveBeenCalledWith(req.body, req.fileName);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(req.json).toHaveBeenCalledWith({
            status: true,
            message: 'Registration done successfully' 
        });
    });
});