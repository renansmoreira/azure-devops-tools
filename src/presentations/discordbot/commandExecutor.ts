import {CommandInteraction} from 'discord.js';
import {DiscordCommand} from './commands/discordCommand';
import {ExecutedCommandWrapper} from './executedCommandWrapper';
import {Users} from '../../core/users';
import {UserId} from '../../core/userId';
import {Logger} from '../../core/logger';

export class CommandExecutor {
    private _users: Users;
    private _commands: DiscordCommand[];
    private _logger: Logger;

    constructor(users: Users, commands: DiscordCommand[], logger: Logger) {
        this._users = users;
        this._commands = commands;
        this._logger = logger;
    }

    async execute(interaction: CommandInteraction): Promise<void> {
        const command = this._commands.find(
            (discordCommand: DiscordCommand) => discordCommand.name === interaction.commandName);

        if (command) {
            try {
                const userCredentials = this._users.get(new UserId(interaction.user.id));
                await command.execute(new ExecutedCommandWrapper(userCredentials, interaction));
            } catch (error) {
                this._logger.error(error);
            }
        }
    }
}
