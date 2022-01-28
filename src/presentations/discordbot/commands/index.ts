import {AzureDevOpsHttpClient} from '../../../adapters/azureDevOpsHttpClient';
import {HttpAxiosImpl} from '../../../adapters/httpAxiosImpl';
import {ConfigProvider} from '../../../config/configProvider';
import {PipelineCommand} from './pipelineCommand';
import {DiscordCommand} from './discordCommand';

const http = new HttpAxiosImpl();
const config = new ConfigProvider();
const azureDevOps = new AzureDevOpsHttpClient(http, config);

export default [
    new PipelineCommand(azureDevOps)
] as DiscordCommand[];
