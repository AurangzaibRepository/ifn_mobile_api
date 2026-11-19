const blogController = require('../../controllers/blog.controller');
const blogService = require('../../services/blog.service');

jest.mock('../../services/blog.service', () => ({
    getListing: jest.fn(),
    getDetails: jest.fn()
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