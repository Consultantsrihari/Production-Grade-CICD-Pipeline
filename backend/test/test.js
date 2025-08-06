// backend/test/test.js
const { expect } = require('chai');

describe('Simple Math Test', () => {
    it('should return 2 when adding 1 and 1', () => {
        expect(1 + 1).to.equal(2);
    });
});