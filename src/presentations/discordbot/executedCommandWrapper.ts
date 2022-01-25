import {ExecutedCommand} from './commands/executedCommand';
import {CommandInteraction} from 'discord.js';

export class ExecutedCommandWrapper implements ExecutedCommand {
    private readonly _commandInteraction: CommandInteraction;

    constructor(commandInteraction: CommandInteraction) {
        this._commandInteraction = commandInteraction;
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
