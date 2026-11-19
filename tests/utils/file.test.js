const fs = require('fs');
const multer = require('multer');
const { upload } = require('../../utils/file.util');
const { json } = require('sequelize');

jest.mock('multer');
jest.mock('fs');

describe('File Utilities', () => {
    describe('upload', () => {
        it('Should return middleware function', () => {
            const result = upload('blogs');

            expect(typeof result).toBe('object');
            expect(typeof result.single).toBe('function');
        });
    });
});