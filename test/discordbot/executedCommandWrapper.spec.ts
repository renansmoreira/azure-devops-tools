import {CommandInteraction, CommandInteractionOptionResolver} from 'discord.js';
import sinon, {SinonStubbedInstance} from 'sinon';
import {ExecutedCommandWrapper} from '../../src/presentations/discordbot/executedCommandWrapper';
import {assert} from 'chai';
import {UserId} from '../../src/core/userId';
import {UserCredentials} from '../../src/core/UserCredentials';
import {ConfigJsonProvider} from '../../src/config/configJsonProvider';

describe('Executed command wrapper', () => {
    let config: SinonStubbedInstance<ConfigJsonProvider>;
    let commandInteraction: SinonStubbedInstance<CommandInteraction>;
    let wrappedCommand: ExecutedCommandWrapper;

    beforeEach(() => {
        config = sinon.createStubInstance(ConfigJsonProvider);
        commandInteraction = sinon.createStubInstance(CommandInteraction)
        wrappedCommand = new ExecutedCommandWrapper(config, commandInteraction);
    });

    [
        ['userid1', 'username1', 'pat1'],
        ['userid2', 'username2', 'pat2']
    ].forEach(([id, username, pat]) => {
        it('should get user command credentials', () => {
            const userId = new UserId(id);
            const expectedCredentials: UserCredentials = {
                id: userId,
                username: username,
                pat: pat
            };
            config.getCredentials.withArgs(userId).returns(expectedCredentials);

            const userCredentials = wrappedCommand.getCredentials(userId);

            assert.deepEqual(expectedCredentials, userCredentials);
        });
    });

    it('should defer reply', () => {
        wrappedCommand.deferReply();

        sinon.assert.called(commandInteraction.deferReply);
    });

    it('should edit reply', async () => {
        const expectedMessage = 'Message';

        await wrappedCommand.editReply(expectedMessage);

        sinon.assert.called(commandInteraction.editReply.withArgs(expectedMessage));
    });

    [
        ['message', 'Hello'],
        ['name', 'My name']
    ].forEach(([paramName, paramValue]) => {
        it(`should get a command parameter: ${paramName}`, () => {
            const options = sinon.createStubInstance(CommandInteractionOptionResolver);
            commandInteraction.options = options;
            options.getString.withArgs(paramName).returns(paramValue);

            const message = wrappedCommand.getString(paramName);

            assert.equal(paramValue, message);
        });
    });
});
