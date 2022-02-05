import {CommandInteraction, CommandInteractionOptionResolver} from 'discord.js';
import sinon, {SinonStubbedInstance} from 'sinon';
import {ExecutedCommandWrapper} from '../../src/presentations/discordbot/executedCommandWrapper';
import {assert} from 'chai';
import {UserId} from '../../src/core/userId';
import {UserCredentials} from '../../src/core/userCredentials';

describe('Executed command wrapper', () => {
    let userCredentials: UserCredentials;
    let commandInteraction: SinonStubbedInstance<CommandInteraction>;
    let wrappedCommand: ExecutedCommandWrapper;

    beforeEach(() => {
        userCredentials = {
            id: new UserId('id'),
            username: 'username',
            pat: 'pat'
        };
        commandInteraction = sinon.createStubInstance(CommandInteraction)
        wrappedCommand = new ExecutedCommandWrapper(userCredentials, commandInteraction);
    });

    it('should get user command credentials', () => {
        const foundUserCredentials = wrappedCommand.getCredentials();

        assert.deepEqual(userCredentials, foundUserCredentials);
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
