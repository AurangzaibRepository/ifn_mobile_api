const { getResponse } = require('../../utils/response.util');

describe('Response Utilities', () => {
    describe('getResponse', () => {
        it('Should return correct response for valid input', () => {
            const result = getResponse(true, 'User saved successfully', {id: 1, name: 'John'});
            expect(result).toEqual({
                status: true,
                message: 'User saved successfully',
                data: {
                    id: 1,
                    name: 'John'
                }
            });
        });

        it('Should return correct response for status only', () => {
            const result = getResponse(true);
            expect(result).toEqual({
                status: true
            });
            expect(result).not.toHaveProperty('message');
            expect(result).not.toHaveProperty('data');
        });

        it('Should return correct response for status and message', () => {
            const result = getResponse(false, 'User not found');
            expect(result).toEqual({
                status: false,
                message: 'User not found'
            });
            expect(result).not.toHaveProperty('data');
        });

        it('Should return null when status is null', () => {
            const result = getResponse(null);
            expect(result).toBeNull();
        });
    });
});