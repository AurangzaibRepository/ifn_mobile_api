const { getLimitOffset } = require('../../utils/page.util');

describe('Page Utilities', () => {
    describe('getLimitOffset', () => {
        beforeEach(() => {
            process.env.PAGE_SIZE = '10';
        });

        it('Should return correct response against valid page number', () => {
            const result = getLimitOffset(1);
            expect(result).toEqual({
                pageSize: 10,
                offset: 0
            });
        });

        it('Should handle invalid page number', () => {
            const result = getLimitOffset('1s');
            expect(result).toBeNull();
        });

        it('Should handle zero page number', () => {
            const result = getLimitOffset(0);
            expect(result).toBeNull();
        })

        it('Should handle empty page number', () => {
            const result = getLimitOffset('');
            expect(result).toBeNull();
        });
    });
});