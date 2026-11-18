const { formatDate } = require('../../utils/formatter.util');

describe('Formatter Utilities', () => {
    describe('formatDate', () => {
        it('It should format a valid date string into DD/MM/YYYY format', () => {
            const result = formatDate('2026-10-05');
            expect(result).toBe('05/10/2026');
        });

        it('Should format a date with single digit date and month', () => {
            const result = formatDate('2026-1-05');
            expect(result).toBe('05/01/2026');
        });

        it('Should handle an invalid date', () => {
            const result = formatDate('2022-01s-abc');
            expect(result).toBeNull();
        });

        it('Should return null for null input', () => {
            const result = formatDate(null);
            expect(result).toBeNull();
        });
    });
});