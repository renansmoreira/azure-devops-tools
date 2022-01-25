import {SlashCommandBuilder} from '@discordjs/builders';
import {ExecutedCommand} from './executedCommand';

export interface DiscordCommand {
    get name(): string;
    get commandBuilder(): Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    execute(executedCommand: ExecutedCommand): void;
}
