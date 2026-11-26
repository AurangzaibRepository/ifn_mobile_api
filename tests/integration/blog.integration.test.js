const db = require('../../models');
const blogService = require('../../services/blog.service');

describe('Blog integration tests', () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should retrieve blogs from the database', async () => {
        let blog;

        try {
            blog = await db.Blog.create({
                title: 'Test blog',
                text: 'Test blog description',
                banner: 'blog.jpeg'
            });

            const result = await blogService.getListing(1);

            expect(result.length).toBeGreaterThan(0);
            expect(result.some(item => item.id == blog.id)).toBe(true);
        } finally {
            if (blog) await blog.destroy();
        }
    });

    it('should retrieve blogs with filter from database', async () => {
        let blog;

        try {
            blog = await db.Blog.create({
                title: 'Test blog 1',
                text: 'Test description',
                banner: 'blog1.jpg'
            });

            const result = await blogService.getListing(1, 'Blog 1');

            expect(result.length).toBeGreaterThan(0);
            expect(result.some(item => item.id == blog.id)).toBe(true);
        } finally {
            if (blog) await blog.destroy();
        }
    });

    it('should retrieve blog details from database', async () => {
        let blog;

        try {
            blog = await db.Blog.create({
                title: 'Test blog 1',
                text: 'Test description',
                banner: 'blog1.jpg'
            });

            const result = await blogService.getDetails(blog.id);

            expect(result).not.toBe(null);
            expect(result.title).toBe('Test blog 1');
        } finally {
            if (blog) await blog.destroy();
        }
    });

    it('should retrieve blog by attribute', async () => {
        let blog;

        try {
            blog = await db.Blog.create({
                title: 'Test blog 1',
                text: 'Test description',
                banner: 'blog1.jpeg'
            });

            const result = await blogService.findByAttribute('title', 'Test blog 1');

            expect(result).not.toBe(null);
            expect(result.title).toBe('Test blog 1');
        } finally {
            if (blog) await blog.destroy();
        }
    });
});