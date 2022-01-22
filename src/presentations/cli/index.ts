import dotenv from 'dotenv';
import { AzureDevOps } from '../../core/azureDevOps';
import { AzureDevOpsHttpCient } from '../../adapters/azureDevOpsHttpClient';
import { PipelineId } from '../../core/pipelineId';
import { Http } from '../../core/http';
import { HttpAxiosImpl } from '../../adapters/httpAxiosImpl';
import { Config } from '../../config/config';
import { ExecutedPipeline } from '../../core/executedPipeline';

dotenv.config();

const http: Http = new HttpAxiosImpl();
const config = new Config();
const azureDevOps: AzureDevOps = new AzureDevOpsHttpCient(http, config);

(async function () {
    const pipelineId = new PipelineId('134');
    const branchName = 'dev';

    console.log(`Running ${pipelineId} on ${branchName}`);

    const executedPipeline: ExecutedPipeline = await azureDevOps.runPipeline(pipelineId, branchName);

    console.log(executedPipeline);
})();
