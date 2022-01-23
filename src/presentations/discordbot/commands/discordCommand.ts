import {CommandInteraction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';

export interface DiscordCommand {
    get name(): string;
    get commandBuilder(): Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    execute(interaction: CommandInteraction): void;
}
