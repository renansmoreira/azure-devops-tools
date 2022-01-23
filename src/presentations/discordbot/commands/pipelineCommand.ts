import {SlashCommandBuilder, SlashCommandStringOption} from '@discordjs/builders';
import {CommandInteraction} from 'discord.js';
import {DiscordCommand} from './discordCommand';

export class PipelineCommand implements DiscordCommand {
    private readonly _commandBuilder: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

    constructor() {
        this._commandBuilder = new SlashCommandBuilder()
            .setName('pipeline').setDescription('Runs pipeline')
            .addStringOption((option: SlashCommandStringOption) => option.setName('name').setDescription('Pipeline name'))
            .addStringOption((option: SlashCommandStringOption) => option.setName('branch').setDescription('Branch name'));
    }

    async execute(interaction: CommandInteraction): Promise<void> {
        const pipelineName = interaction.options.getString('name');
        const branchName = interaction.options.getString('branch');
        await interaction.reply(`Running ${pipelineName} on ${branchName}`);
    }

    get name(): string {
        return 'pipeline';
    }

    get commandBuilder(): Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> {
        return this._commandBuilder;
    }
}
