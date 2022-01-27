import {assert} from 'chai';
import sinon, {SinonStubbedInstance} from 'sinon';
import {AzureDevOpsHttpClient} from '../../src/adapters/azureDevOpsHttpClient';
import {ConfigJsonProvider} from '../../src/config/configJsonProvider';
import {AzureDevOps} from '../../src/core/azureDevOps';
import {Http} from '../../src/core/http';
import {HttpAxiosImpl} from '../../src/adapters/httpAxiosImpl';
import {PipelineId} from '../../src/core/pipelineId';
import {StageStatus} from '../../src/adapters/stageStatus';
import {StageId} from '../../src/core/stageId';

describe('Azure DevOps HTTP client', () => {
    let http: SinonStubbedInstance<Http>;
    let config: SinonStubbedInstance<ConfigJsonProvider>;
    let azureDevOps: AzureDevOps;

    beforeEach(() => {
        http = sinon.createStubInstance<Http>(HttpAxiosImpl);
        config = sinon.createStubInstance<ConfigJsonProvider>(ConfigJsonProvider);

        azureDevOps = new AzureDevOpsHttpClient(http, config);
    })

    it('should run a pipeline', () => {
        const pipelineId = new PipelineId('300');
        const branchName = 'main';
        config.getEnv.withArgs('AZURE_DEVOPS_URI').returns('');
        const expectedUrl = `/_apis/pipelines/${pipelineId}/runs?api-version=6.1-preview.1`;

        azureDevOps.runPipeline(pipelineId, branchName);

        assert.equal(http.post.getCall(0).firstArg.url, expectedUrl);
    });

    it('should run a pipeline with a specific branch', () => {
        const pipelineId = new PipelineId('300');
        const branchName = 'main';
        const expectedData = {
            resources: {
                repositories: {
                    self: {
                        refName: `refs/heads/${branchName}`
                    }
                }
            }
        };

        azureDevOps.runPipeline(pipelineId, branchName);

        assert.deepEqual(http.post.getCall(0).firstArg.data, expectedData);
    });

    it('should run pipeline using provided credentials', () => {
        const pipelineId = new PipelineId('300');
        const branchName = 'main';
        const expectedUsername = 'username';
        const expectedPat = 'pat';
        config.getEnv.withArgs('AZURE_DEVOPS_USERNAME').returns(expectedUsername);
        config.getEnv.withArgs('AZURE_DEVOPS_PAT').returns(expectedPat);

        azureDevOps.runPipeline(pipelineId, branchName);

        assert.deepEqual(http.post.getCall(0).firstArg.username, expectedUsername);
        assert.deepEqual(http.post.getCall(0).firstArg.pat, expectedPat);
    });

    it('should approve stage', () => {
        config.getEnv.withArgs('AZURE_DEVOPS_URI').returns('');
        const expectedUrl = '/_apis/pipelines/approvals?api-version=6.1-preview.1';
        const stageId = new StageId('200');
        const expectedData = [
            {
                approvalId: stageId,
                status: StageStatus.APPROVE.toString(),
                comment: undefined
            }
        ];

        azureDevOps.approveStage(stageId, StageStatus.APPROVE);

        assert.equal(http.post.getCall(0).firstArg.url, expectedUrl);
        assert.deepEqual(http.post.getCall(0).firstArg.data, expectedData);
    });

    it('should approve stage with comments', () => {
        const stageId = new StageId('200');
        const expectedComment = 'Random comment'
        const expectedData = [
            {
                approvalId: stageId,
                status: StageStatus.APPROVE.toString(),
                comment: expectedComment
            }
        ];

        azureDevOps.approveStage(stageId, StageStatus.APPROVE, expectedComment);

        assert.deepEqual(http.post.getCall(0).firstArg.data, expectedData);
    });

    it('should approve stage using provided credentials', () => {
        const expectedUsername = 'username';
        const expectedPat = 'pat';
        config.getEnv.withArgs('AZURE_DEVOPS_USERNAME').returns(expectedUsername);
        config.getEnv.withArgs('AZURE_DEVOPS_PAT').returns(expectedPat);
        const stageId = new StageId('100');

        azureDevOps.approveStage(stageId, StageStatus.APPROVE);

        assert.deepEqual(http.post.getCall(0).firstArg.username, expectedUsername);
        assert.deepEqual(http.post.getCall(0).firstArg.pat, expectedPat);
    });
});
