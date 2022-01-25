import sinon, {SinonStubbedInstance} from 'sinon';
import {PipelineCommand} from '../../../src/presentations/discordbot/commands/pipelineCommand';
import {DiscordCommand} from '../../../src/presentations/discordbot/commands/discordCommand';
import {AzureDevOpsHttpClient} from '../../../src/adapters/azureDevOpsHttpClient';
import {AzureDevOps} from '../../../src/core/azureDevOps';
import {PipelineId} from '../../../src/core/pipelineId';
import {assert} from 'chai';
import {ExecutedCommand} from '../../../src/presentations/discordbot/commands/executedCommand';
import {ExecutedCommandWrapper} from '../../../src/presentations/discordbot/executedCommandWrapper';
import {ExecutedPipeline} from '../../../src/core/executedPipeline';

describe('Discord "pipeline" command', () => {
    let pipelineId: PipelineId;
    let branchName: string;
    let executedPipeline: ExecutedPipeline;
    let executedCommand: SinonStubbedInstance<ExecutedCommand>;

    let azureDevOps: SinonStubbedInstance<AzureDevOps>;
    let command: DiscordCommand;

    beforeEach(() => {
        pipelineId = new PipelineId('32');
        branchName = 'dev';

        executedCommand = sinon.createStubInstance(ExecutedCommandWrapper);
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

        azureDevOps = sinon.createStubInstance(AzureDevOpsHttpClient);
        azureDevOps.runPipeline.resolves(executedPipeline);

        command = new PipelineCommand(azureDevOps);
    });

    it('should run pipeline', async () => {
        await command.execute(executedCommand);

        assert.isTrue(azureDevOps.runPipeline.calledOnce);
        assert.isTrue(azureDevOps.runPipeline.calledWithExactly(pipelineId, branchName));
    });

    it('should answer in correct order', async () => {
        await command.execute(executedCommand);

        sinon.assert.callOrder(executedCommand.deferReply, executedCommand.editReply);
    });

    it('should reply command message', async () => {
        const expectedReply = `Running ${pipelineId} on ${branchName}: ${executedPipeline._links.web.href}`;

        await command.execute(executedCommand);

        assert.equal(executedCommand.editReply.getCall(0).firstArg, expectedReply);
    });
});
