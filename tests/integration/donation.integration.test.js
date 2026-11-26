const db = require('../../models');
const donationService = require('../../services/donation.service');
const donationContributionService = require('../../services/donation_contribution.service');

describe('Donation integration tests', () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should return donations successfully', async () => {
        let donation;

        try {
            donation = await db.Donation.create({
                title: 'Test donation',
                description: 'Test description',
                goal: 20
            });

            const result = await donationService.getListing(1);

            expect(result).not.toBeNull();
            expect(result.some(item => item.id === donation.id)).toBe(true);
        } finally {
            if (donation) await donation.destroy();
        }
    });

    it('should return donation details successfully', async () => {
        let donation;

        try {
            donation = await db.Donation.create({
                title: 'Test donation',
                description: 'Test description',
                goal: 20
            });

            const result = await donationService.getDetails(donation.id);

            expect(result).not.toBeNull();
            expect(result.id).toBe(donation.id);
        } finally {
            if (donation) await donation.destroy();
        }
    });

    it('should make donation successfully', async () => {
        let user; 
        let donation;
        let donationContribution;

        try {
            user = await db.User.create({
                firstName: 'Demo',
                lastName: 'User'
            });

            donation = await db.Donation.create({
                title: 'Test donation',
                description: 'Test description',
                goal: 20
            });

            const data = {
                donation_id: donation.id,
                user_id: user.id,
                amount: 200
            };

            await donationContributionService.makeDonation(data);

            donationContribution = await db.DonationContribution.findOne({
                where: {
                    donation_id: donation.id,
                    user_id: user.id
                }
            });

            expect(donationContribution).not.toBeNull();
            expect(donationContribution.donation_id).toBe(donation.id);
        } finally {
            if (donationContribution) await donationContribution.destroy();
            if (donation) await donation.destroy();
            if (user) await user.destroy();
        }
    });
});