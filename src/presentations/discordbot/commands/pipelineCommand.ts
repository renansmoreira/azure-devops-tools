import {SlashCommandBuilder, SlashCommandStringOption} from '@discordjs/builders';
import {DiscordCommand} from './discordCommand';
import {AzureDevOps} from '../../../core/azureDevOps';
import {PipelineId} from '../../../core/pipelineId';
import {ExecutedCommand} from './executedCommand';

export class PipelineCommand implements DiscordCommand {
    private readonly _azureDevOps: AzureDevOps;
    private readonly _commandBuilder: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

    constructor(azureDevOps: AzureDevOps) {
        this._azureDevOps = azureDevOps;
        this._commandBuilder = new SlashCommandBuilder()
            .setName('pipeline').setDescription('Runs pipeline')
            .addStringOption((option: SlashCommandStringOption) => option.setName('name').setDescription('Pipeline name'))
            .addStringOption((option: SlashCommandStringOption) => option.setName('branch').setDescription('Branch name'));
    }

    async execute(executedCommand: ExecutedCommand): Promise<void> {
        const pipelineName = executedCommand.getString('name') || '';
        const branchName = executedCommand.getString('branch') || '';

        await executedCommand.deferReply();
        const executedPipeline = await this._azureDevOps.runPipeline(new PipelineId(pipelineName), branchName);
        await executedCommand.editReply(`Running ${pipelineName} on ${branchName}: ${executedPipeline._links.web.href}`);
    }

    get name(): string {
        return 'pipeline';
    }

    get commandBuilder(): Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> {
        return this._commandBuilder;
    }
}
