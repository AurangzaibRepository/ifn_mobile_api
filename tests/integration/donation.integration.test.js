const db = require('../../models');
const donationService = require('../../services/donation.service');

describe('Donation integration tests', () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should return donations successfully', async () => {
        const donation = await db.Donation.create({
            title: 'Test donation',
            description: 'Test description',
            goal: 20
        });

        const result = await donationService.getListing(1);

        expect(result).not.toBeNull();
        expect(result.some(item => item.id === donation.id)).toBe(true);

        await donation.destroy();
    });

    it('should return donation details successfully', async () => {
        const donation = await db.Donation.create({
            title: 'Test donation',
            description: 'Test description',
            goal: 20
        });

        const result = await donationService.getDetails(donation.id);

        expect(result).not.toBeNull();
        expect(result.id).toBe(donation.id);

        await donation.destroy();
    });
});