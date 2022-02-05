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
import {UserCredentials} from '../../../src/core/userCredentials';
import {UserId} from '../../../src/core/userId';
import {LoggerProvider} from '../../../src/adapters/LoggerProvider';

describe('Discord "pipeline" command', () => {
    let userCredentials: UserCredentials;
    let pipelineId: PipelineId;
    let branchName: string;
    let executedPipeline: ExecutedPipeline;
    let executedCommand: SinonStubbedInstance<ExecutedCommand>;

    let azureDevOps: SinonStubbedInstance<AzureDevOps>;
    let logger: SinonStubbedInstance<LoggerProvider>;
    let command: DiscordCommand;

    beforeEach(() => {
        userCredentials = {
            id: new UserId('id'),
            username: 'username',
            pat: 'pat'
        };
        pipelineId = new PipelineId('32');
        branchName = 'dev';

        executedCommand = sinon.createStubInstance(ExecutedCommandWrapper);
        executedCommand.getCredentials.returns(userCredentials);
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

        logger = sinon.createStubInstance(LoggerProvider);

        command = new PipelineCommand(azureDevOps, logger);
    });

    it('should run pipeline', async () => {
        await command.execute(executedCommand);

        assert.isTrue(azureDevOps.runPipeline.calledOnce);
        assert.isTrue(azureDevOps.runPipeline.calledWithExactly(userCredentials, pipelineId, branchName));
    });

    it('should answer in correct order', async () => {
        await command.execute(executedCommand);

        sinon.assert.callOrder(executedCommand.deferReply, executedCommand.editReply);
    });

    it('should reply command message', async () => {
        const expectedReply = `Running ${pipelineId} on ${branchName}: ${executedPipeline._links.web.href}`;

        await command.execute(executedCommand);

        assert.isTrue(executedCommand.editReply.calledOnceWithExactly(expectedReply));
    });

    it('should reply an error', async () => {
        azureDevOps.runPipeline.throws(Error);
        const expectedMessage = 'An error was occurred trying to run this pipeline :(';

        await command.execute(executedCommand);

        assert.isTrue(executedCommand.editReply.calledOnceWith(expectedMessage));
    });

    it('should log an error', async () => {
        const expectedError = new Error('random error');
        azureDevOps.runPipeline.throws(expectedError);

        await command.execute(executedCommand);

        assert.isTrue(logger.error.calledOnceWith(expectedError));
    });
});
