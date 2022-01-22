import { assert } from 'chai';
import { PipelineId } from '../../src/core/pipelineId';

describe('Pipeline id', () => {
    it('should have an id', () => {
        const expectedId = '123';

        const pipelineId = new PipelineId(expectedId);

        assert.equal(pipelineId.id, expectedId);
    });

    it('should handle invalid input data', () => {
        const expectedId = '';
        
        const pipelineId = new PipelineId('  ');

        assert.equal(pipelineId.id, expectedId);
    });

    it('should override toString()', () => {
        const expectedId = '300';

        const pipelineId = new PipelineId(expectedId);

        assert.equal(pipelineId.toString(), expectedId);
    });
})