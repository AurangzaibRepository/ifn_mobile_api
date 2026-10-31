const { formatDate, formattedValidationResult } = require('../utils/formatter.util');

describe('Formatter Utilities', () => {
    describe('formatDate', () => {
        it('It should format a valid date string into DD/MM/YYYY format', () => {
            const result = formatDate('2026-10-05');
            expect(result).toBe('05/10/2026');
        });
    });

    describe('formattedValidationResult', () => {

    });
});