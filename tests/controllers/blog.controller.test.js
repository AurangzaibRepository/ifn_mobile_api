const blogController = require('../../controllers/blog.controller');
const blogService = require('../../services/blog.service');
const { detailValidator } = require('../../validators/blog.validators');

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('../../services/blog.service', () => ({
    getListing: jest.fn(),
    getDetails: jest.fn(),
    findByAttribute: jest.fn()
}));

describe('listing', () => {
    it('Should return blog listing successfully', async () => {
        const req = {
            params: {
                pageNumber: 1
            },
            query: {
                keyword: 'Demo'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const blogs = [{
            id: 1, title: 'Test blog 1'
        }, {
            id: 1, title: 'Test blog 2'
        }];

        blogService.getListing.mockResolvedValue(blogs);

        await blogController.listing(req, res);

        expect(blogService.getListing).toHaveBeenCalledWith(1, 'Demo');

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: blogs
        });
    });
});

describe('details', () => {
    it('Should return blog successfully', async () => {
        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const blog = {
            id: 1,
            title: 'Test blog'
        };

        blogService.getDetails.mockResolvedValue(blog);

        await blogController.details(req, res);

        expect(blogService.getDetails).toHaveBeenCalledWith(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: blog
        });
    });

    it('Should return validation error if blog not found', async () => {
        const req = {
            params: {
                id: 2000
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        blogService.findByAttribute.mockResolvedValue(null);

        for (const validator of detailValidator) {
            await validator.run(req);
        }

        await blogController.details(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(blogService.getDetails).not.toHaveBeenCalled();
    });
});