import sinon, {SinonStubbedInstance} from 'sinon';
import {PipelineCommand} from '../../src/presentations/discordbot/commands/pipelineCommand';
import {CommandExecutor} from '../../src/presentations/discordbot/commandExecutor';
import {UserProvider} from '../../src/adapters/userProvider';
import {CommandInteraction, User} from 'discord.js';
import {ExecutedCommandWrapper} from '../../src/presentations/discordbot/executedCommandWrapper';
import {UserId} from '../../src/core/userId';
import {UserCredentials} from '../../src/core/userCredentials';
import {assert} from 'chai';
import {Users} from '../../src/core/users';
import {Logger} from '../../src/core/logger';
import {LoggerProvider} from '../../src/adapters/LoggerProvider';

describe('Command executor', () => {
    let userCredentials: UserCredentials;
    let users: SinonStubbedInstance<Users>;
    let commandStub: SinonStubbedInstance<PipelineCommand>;
    let commandExecutor: CommandExecutor;
    let logger: SinonStubbedInstance<Logger>;

    beforeEach(() => {
        userCredentials = {
            id: new UserId('id'),
            username: 'username',
            pat: 'pat'
        };
        users = sinon.createStubInstance(UserProvider);
        users.get.withArgs(userCredentials.id).returns(userCredentials);

        commandStub = sinon.createStubInstance(PipelineCommand);
        logger = sinon.createStubInstance(LoggerProvider);
        commandExecutor = new CommandExecutor(users, [commandStub], logger);
    });

    it('should execute a command including user credentials', async () => {
        const interaction = createStubbedCommandInteraction(commandStub.name);
        addStubbedDiscordUser(interaction);
        const commandWrapper = new ExecutedCommandWrapper(userCredentials, interaction);

        await commandExecutor.execute(interaction);

        assert.isTrue(commandStub.execute.calledOnceWith(commandWrapper));
    });

    it('should not execute a invalid command', async () => {
        const interaction = createStubbedCommandInteraction('unknown command name');

        await commandExecutor.execute(interaction);

        assert.isTrue(commandStub.execute.notCalled);
    });

    it('should reply errors', async () => {
        const expectedReply = {content: 'There was an error while executing this command!', ephemeral: true};
        const interaction = createStubbedCommandInteraction(commandStub.name);
        addStubbedDiscordUser(interaction);
        commandStub.execute.throws(Error);

        await commandExecutor.execute(interaction);

        assert.isTrue(interaction.reply.calledOnceWith(expectedReply));
    });

    it('should log errors', async () => {
        const interaction = createStubbedCommandInteraction(commandStub.name);
        addStubbedDiscordUser(interaction);
        const expectedError = new Error('random error');
        commandStub.execute.throws(expectedError);

        await commandExecutor.execute(interaction);

        assert.isTrue(logger.error.calledOnceWith(expectedError));
    });

    function createStubbedCommandInteraction(name: string): SinonStubbedInstance<CommandInteraction> {
        const interaction: SinonStubbedInstance<CommandInteraction> = sinon.createStubInstance(CommandInteraction);
        interaction.commandName = name;
        return interaction;
    }

    function addStubbedDiscordUser(interaction: CommandInteraction): void {
        const discordUser: SinonStubbedInstance<User> = sinon.createStubInstance(User);
        discordUser.id = userCredentials.id.toString();
        interaction.user = discordUser;
    }
});
