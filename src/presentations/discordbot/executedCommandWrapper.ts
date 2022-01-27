import {ExecutedCommand} from './commands/executedCommand';
import {CommandInteraction} from 'discord.js';
import {UserId} from '../../core/userId';
import {UserCredentials} from '../../core/UserCredentials';
import {Config} from '../../core/config';

export class ExecutedCommandWrapper implements ExecutedCommand {
    private readonly _config: Config;
    private readonly _commandInteraction: CommandInteraction;

    constructor(config: Config, commandInteraction: CommandInteraction) {
        this._config = config;
        this._commandInteraction = commandInteraction;
    }

    getCredentials(userId: UserId): UserCredentials {
        return this._config.getCredentials(userId);
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
