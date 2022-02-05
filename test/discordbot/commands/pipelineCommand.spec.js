"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const pipelineCommand_1 = require("../../../src/presentations/discordbot/commands/pipelineCommand");
const azureDevOpsHttpClient_1 = require("../../../src/adapters/azureDevOpsHttpClient");
const pipelineId_1 = require("../../../src/core/pipelineId");
const chai_1 = require("chai");
const executedCommandWrapper_1 = require("../../../src/presentations/discordbot/executedCommandWrapper");
describe('Discord "pipeline" command', () => {
    let pipelineId;
    let branchName;
    let executedPipeline;
    let executedCommand;
    let azureDevOps;
    let command;
    beforeEach(() => {
        pipelineId = new pipelineId_1.PipelineId('32');
        branchName = 'dev';
        executedCommand = sinon_1.default.createStubInstance(executedCommandWrapper_1.ExecutedCommandWrapper);
        executedCommand.getString.withArgs('name').returns(pipelineId.toString());
        executedCommand.getString.withArgs('branch').returns(branchName);
        executedPipeline = {
            id: 32,
            name: 'name',
            _links: {
                'pipeline.web': { href: 'pipelinewebhref' },
                web: { href: 'webhref' }
            }
        };
        azureDevOps = sinon_1.default.createStubInstance(azureDevOpsHttpClient_1.AzureDevOpsHttpClient);
        azureDevOps.runPipeline.resolves(executedPipeline);
        command = new pipelineCommand_1.PipelineCommand(azureDevOps);
    });
    it('should run pipeline', () => __awaiter(void 0, void 0, void 0, function* () {
        yield command.execute(executedCommand);
        chai_1.assert.isTrue(azureDevOps.runPipeline.calledOnce);
        chai_1.assert.isTrue(azureDevOps.runPipeline.calledWithExactly(pipelineId, branchName));
    }));
    it('should answer in correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield command.execute(executedCommand);
        sinon_1.default.assert.callOrder(executedCommand.deferReply, executedCommand.editReply);
    }));
    it('should reply command message', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedReply = `Running ${pipelineId} on ${branchName}: ${executedPipeline._links.web.href}`;
        yield command.execute(executedCommand);
        chai_1.assert.equal(executedCommand.editReply.getCall(0).firstArg, expectedReply);
    }));
});
