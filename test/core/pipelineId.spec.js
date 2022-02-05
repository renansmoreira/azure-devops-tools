"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const pipelineId_1 = require("../../src/core/pipelineId");
describe('Pipeline id', () => {
    it('should have an id', () => {
        const expectedId = '123';
        const pipelineId = new pipelineId_1.PipelineId(expectedId);
        chai_1.assert.equal(pipelineId.id, expectedId);
    });
    it('should handle invalid input data', () => {
        const expectedId = '';
        const pipelineId = new pipelineId_1.PipelineId('  ');
        chai_1.assert.equal(pipelineId.id, expectedId);
    });
    it('should override toString()', () => {
        const expectedId = '300';
        const pipelineId = new pipelineId_1.PipelineId(expectedId);
        chai_1.assert.equal(pipelineId.toString(), expectedId);
    });
});
