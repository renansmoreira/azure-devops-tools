import {AzureDevOpsHttpClient} from '../../../adapters/azureDevOpsHttpClient';
import {HttpAxiosImpl} from '../../../adapters/httpAxiosImpl';
import {Config} from '../../../config/config';
import {PipelineCommand} from './pipelineCommand';
import {DiscordCommand} from './discordCommand';

const http = new HttpAxiosImpl();
const config = new Config();
const azureDevOps = new AzureDevOpsHttpClient(http, config);

export default [
    new PipelineCommand(azureDevOps)
] as DiscordCommand[];
