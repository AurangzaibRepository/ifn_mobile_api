const { upload } = require('../../utils/file.util');

describe('File Utilities', () => {
    describe('upload', () => {
        it('Should return middleware function', () => {
            const result = upload('blogs');
            expect(typeof result).toBe('object');
        });
    });
});