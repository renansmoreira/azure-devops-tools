import {AzureDevOpsHttpClient} from '../../../adapters/azureDevOpsHttpClient';
import {HttpAxiosImpl} from '../../../adapters/httpAxiosImpl';
import {ConfigProvider} from '../../../config/configProvider';
import {PipelineCommand} from './pipelineCommand';
import {DiscordCommand} from './discordCommand';
import {LoggerProvider} from '../../../adapters/loggerProvider';

const http = new HttpAxiosImpl();
const config = new ConfigProvider();
const azureDevOps = new AzureDevOpsHttpClient(http, config);
const logger = new LoggerProvider();

export default [
    new PipelineCommand(azureDevOps, logger)
] as DiscordCommand[];
