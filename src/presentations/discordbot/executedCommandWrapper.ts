import {ExecutedCommand} from './commands/executedCommand';
import {CommandInteraction} from 'discord.js';
import {UserCredentials} from '../../core/userCredentials';

export class ExecutedCommandWrapper implements ExecutedCommand {
    private readonly _userCredentials: UserCredentials;
    private readonly _commandInteraction: CommandInteraction;

    constructor(userCredentials: UserCredentials, commandInteraction: CommandInteraction) {
        this._userCredentials = userCredentials;
        this._commandInteraction = commandInteraction;
    }

    getCredentials(): UserCredentials {
        return this._userCredentials;
    }

    deferReply(): Promise<void> {
        return this._commandInteraction.deferReply();
    }

    async editReply(message: string): Promise<void> {
        await this._commandInteraction.editReply(message);
        return Promise.resolve();
    }

    getString(paramName: string): string {
        return this._commandInteraction.options.getString(paramName) || '';
    }
}
