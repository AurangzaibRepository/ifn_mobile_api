const db = require('../../models');
const { Op } = require('sequelize');
const blogService = require('../../services/blog.service');

beforeEach(() => {
    jest.clearAllMocks();
    process.env.PAGE_SIZE = '10';
});

jest.mock('../../models', () => ({
    Blog: {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn()
    }
}));

describe('findByAttribute', () => {
    it('Should return a blog', async () => {
        db.Blog.findOne.mockResolvedValue({
            id: 1,
            title: 'Test blog'
        });

        const result = await blogService.findByAttribute('id', 1);

        expect(result).toEqual({
            id: 1,
            title: 'Test blog'
        });

        expect(db.Blog.findOne).toHaveBeenCalledWith({
            where: {
                id: 1
            }
        });
    });

    it('Should return null when blog does not exist', async () => {
        db.Blog.findOne.mockResolvedValue(null);

        const result = await blogService.findByAttribute('id', 10);

        expect(result).toBeNull();
        expect(db.Blog.findOne).toHaveBeenCalledWith({
            where: {
                id: 10
            }
        });
    });
});

describe('getDetails', () => {
    it('Should return blog details when exists', async () => {
        db.Blog.findByPk.mockResolvedValue({
            id: 1,
            title: 'Test blog'
        });

        const result = await blogService.getDetails(1);

        expect(result).toEqual({
            id: 1,
            title: 'Test blog'
        });

        expect(db.Blog.findByPk).toHaveBeenCalledWith(1);
    });

    it('Should return null when blog does not exist', async () => {
        db.Blog.findByPk.mockResolvedValue(null);

        const result = await blogService.getDetails(1);

        expect(result).toBeNull();
    });
});

describe('getListing', () => {
    it('Should return all blogs', async () => {
        db.Blog.findAll.mockResolvedValue([{
            id: 1,
            title: 'Test blog 1'
        }, {
            id: 2,
            title: 'Test blog 2'
        }]);

        const result = await blogService.getListing(1);

        expect(result).toEqual([{
            id: 1,
            title: 'Test blog 1'
        }, {
            id: 2,
            title: 'Test blog 2'
        }]);

        expect(db.Blog.findAll).toHaveBeenCalledWith({
            where: {},
            limit: 10,
            offset: 0
        });
    });

    it('Should return all blogs with keyword filter', async () => {
        db.Blog.findAll.mockResolvedValue([{
            id: 1,
            title: 'Test blog 1'
        }]);

        const result = await blogService.getListing(1, 'blog 1');

        expect(result).toEqual([{
            id: 1,
            title: 'Test blog 1'
        }]);

        expect(db.Blog.findAll).toHaveBeenCalledWith(
            expect.objectContaining({
                where: expect.objectContaining({
                    [Op.or]: expect.arrayContaining([
                        {
                            title: {
                                [Op.like]: '%blog 1%'
                            }
                        }
                    ])
                }),
                limit: 10,
                offset: 0
            })
        );
    });

    it('Should not return data with incorrect keyword', async () => {
        db.Blog.findAll.mockResolvedValue([]);

        const result = await blogService.getListing(1, 'dummy');

        expect(result).toEqual([]);
    });
});