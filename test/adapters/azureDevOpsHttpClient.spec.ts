import { assert } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';
import { AzureDevOpsHttpCient } from '../../src/adapters/azureDevOpsHttpClient';
import { Config } from '../../src/config/config';
import { AzureDevOps } from '../../src/core/azureDevOps';
import { Http } from '../../src/core/http';
import { HttpAxiosImpl } from '../../src/adapters/httpAxiosImpl';
import { PipelineId } from '../../src/core/pipelineId';

describe('Azure DevOps HTTP client', () => {
    let http: SinonStubbedInstance<Http>;
    let config: SinonStubbedInstance<Config>;
    let azureDevOps: AzureDevOps;
    let pipelineId: PipelineId;
    let branchName: string;

    beforeEach(() => {
        http = sinon.createStubInstance<Http>(HttpAxiosImpl);
        config = sinon.createStubInstance<Config>(Config);

        azureDevOps = new AzureDevOpsHttpCient(http, config);

        pipelineId = new PipelineId('300');
        branchName = 'main';
    })

    it('should run a pipeline', () => {
        azureDevOps.runPipeline(pipelineId, branchName);

        assert.isTrue(http.post.calledOnce);
    });

    it('should run a specific pipeline with a specific api version', () => {
        config.getEnv.withArgs('AZURE_DEVOPS_URI').returns('');
        const expectedUrl = `/_apis/pipelines/${pipelineId}/runs?api-version=6.1-preview.1`;

        azureDevOps.runPipeline(pipelineId, branchName);

        assert.equal(http.post.getCall(0).firstArg.url, expectedUrl);
    });

    it('should run a pipeline with a specific branch', () => {
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
        const expectedUsername = 'username';
        const expectedPat = 'pat';
        config.getEnv.withArgs('AZURE_DEVOPS_USERNAME').returns(expectedUsername);
        config.getEnv.withArgs('AZURE_DEVOPS_PAT').returns(expectedPat);

        azureDevOps.runPipeline(pipelineId, branchName);

        assert.deepEqual(http.post.getCall(0).firstArg.username, expectedUsername);
        assert.deepEqual(http.post.getCall(0).firstArg.pat, expectedPat);
    });
});