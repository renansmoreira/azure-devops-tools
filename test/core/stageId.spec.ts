import { assert } from 'chai';
import { StageId } from '../../src/core/stageId';

describe('Stage id', () => {
    it('should have an id', () => {
        const expectedId = '123';

        const stageId = new StageId(expectedId);

        assert.equal(stageId.id, expectedId);
    });

    it('should handle invalid input data', () => {
        const expectedId = '';

        const stageId = new StageId('  ');

        assert.equal(stageId.id, expectedId);
    });

    it('should override toString()', () => {
        const expectedId = '300';

        const stageId = new StageId(expectedId);

        assert.equal(stageId.toString(), expectedId);
    });
})