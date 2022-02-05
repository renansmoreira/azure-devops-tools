"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const stageId_1 = require("../../src/core/stageId");
describe('Stage id', () => {
    it('should have an id', () => {
        const expectedId = '123';
        const stageId = new stageId_1.StageId(expectedId);
        chai_1.assert.equal(stageId.id, expectedId);
    });
    it('should handle invalid input data', () => {
        const expectedId = '';
        const stageId = new stageId_1.StageId('  ');
        chai_1.assert.equal(stageId.id, expectedId);
    });
    it('should override toString()', () => {
        const expectedId = '300';
        const stageId = new stageId_1.StageId(expectedId);
        chai_1.assert.equal(stageId.toString(), expectedId);
    });
});
