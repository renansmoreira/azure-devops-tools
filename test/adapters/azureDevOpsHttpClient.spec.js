"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const azureDevOpsHttpClient_1 = require("../../src/adapters/azureDevOpsHttpClient");
const configProvider_1 = require("../../src/config/configProvider");
const httpAxiosImpl_1 = require("../../src/adapters/httpAxiosImpl");
const pipelineId_1 = require("../../src/core/pipelineId");
const stageStatus_1 = require("../../src/adapters/stageStatus");
const stageId_1 = require("../../src/core/stageId");
describe('Azure DevOps HTTP client', () => {
    let http;
    let config;
    let azureDevOps;
    beforeEach(() => {
        http = sinon_1.default.createStubInstance(httpAxiosImpl_1.HttpAxiosImpl);
        config = sinon_1.default.createStubInstance(configProvider_1.ConfigProvider);
        azureDevOps = new azureDevOpsHttpClient_1.AzureDevOpsHttpClient(http, config);
    });
    it('should run a pipeline', () => {
        const pipelineId = new pipelineId_1.PipelineId('300');
        const branchName = 'main';
        config.getEnv.withArgs('AZURE_DEVOPS_URI').returns('');
        const expectedUrl = `/_apis/pipelines/${pipelineId}/runs?api-version=6.1-preview.1`;
        azureDevOps.runPipeline(pipelineId, branchName);
        chai_1.assert.equal(http.post.getCall(0).firstArg.url, expectedUrl);
    });
    it('should run a pipeline with a specific branch', () => {
        const pipelineId = new pipelineId_1.PipelineId('300');
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
        chai_1.assert.deepEqual(http.post.getCall(0).firstArg.data, expectedData);
    });
    it('should run pipeline using provided credentials', () => {
        const pipelineId = new pipelineId_1.PipelineId('300');
        const branchName = 'main';
        const expectedUsername = 'username';
        const expectedPat = 'pat';
        config.getEnv.withArgs('AZURE_DEVOPS_USERNAME').returns(expectedUsername);
        config.getEnv.withArgs('AZURE_DEVOPS_PAT').returns(expectedPat);
        azureDevOps.runPipeline(pipelineId, branchName);
        chai_1.assert.deepEqual(http.post.getCall(0).firstArg.username, expectedUsername);
        chai_1.assert.deepEqual(http.post.getCall(0).firstArg.pat, expectedPat);
    });
    it('should approve stage', () => {
        config.getEnv.withArgs('AZURE_DEVOPS_URI').returns('');
        const expectedUrl = '/_apis/pipelines/approvals?api-version=6.1-preview.1';
        const stageId = new stageId_1.StageId('200');
        const expectedData = [
            {
                approvalId: stageId,
                status: stageStatus_1.StageStatus.APPROVE.toString(),
                comment: undefined
            }
        ];
        azureDevOps.approveStage(stageId, stageStatus_1.StageStatus.APPROVE);
        chai_1.assert.equal(http.post.getCall(0).firstArg.url, expectedUrl);
        chai_1.assert.deepEqual(http.post.getCall(0).firstArg.data, expectedData);
    });
    it('should approve stage with comments', () => {
        const stageId = new stageId_1.StageId('200');
        const expectedComment = 'Random comment';
        const expectedData = [
            {
                approvalId: stageId,
                status: stageStatus_1.StageStatus.APPROVE.toString(),
                comment: expectedComment
            }
        ];
        azureDevOps.approveStage(stageId, stageStatus_1.StageStatus.APPROVE, expectedComment);
        chai_1.assert.deepEqual(http.post.getCall(0).firstArg.data, expectedData);
    });
    it('should approve stage using provided credentials', () => {
        const expectedUsername = 'username';
        const expectedPat = 'pat';
        config.getEnv.withArgs('AZURE_DEVOPS_USERNAME').returns(expectedUsername);
        config.getEnv.withArgs('AZURE_DEVOPS_PAT').returns(expectedPat);
        const stageId = new stageId_1.StageId('100');
        azureDevOps.approveStage(stageId, stageStatus_1.StageStatus.APPROVE);
        chai_1.assert.deepEqual(http.post.getCall(0).firstArg.username, expectedUsername);
        chai_1.assert.deepEqual(http.post.getCall(0).firstArg.pat, expectedPat);
    });
});
