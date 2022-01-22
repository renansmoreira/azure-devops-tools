import {Config} from '../config/config';
import {AzureDevOps} from '../core/azureDevOps';
import {ExecutedPipeline} from '../core/executedPipeline';
import {Http} from '../core/http';
import {PipelineId} from '../core/pipelineId';
import {StageId} from '../core/stageId';
import {StageStatus} from './stageStatus';

export class AzureDevOpsHttpCient implements AzureDevOps {
    private _http: Http;
    private _config: Config;

    constructor(http: Http, config: Config) {
        this._http = http;
        this._config = config;
    }

    async runPipeline(pipelineId: PipelineId, branchName: string): Promise<ExecutedPipeline> {
        const executedPipeline = await this._http.post<ExecutedPipeline>({
            url: `${this._config.azureDevOpsUri}/_apis/pipelines/${pipelineId}/runs?api-version=6.1-preview.1`,
            username: this._config.username,
            pat: this._config.pat,
            data: {
                resources: {
                    repositories: {
                        self: {
                            refName: `refs/heads/${branchName}`
                        }
                    }
                }
            }
        });

        return Promise.resolve(executedPipeline);
    }

    async approveStage(stageId: StageId, status: StageStatus, comment?: string): Promise<void> {
        await this._http.post<ExecutedPipeline>({
            url: `${this._config.azureDevOpsUri}/_apis/pipelines/approvals?api-version=6.1-preview.1`,
            username: this._config.username,
            pat: this._config.pat,
            data: [
                {
                    approvalId: stageId,
                    status: status.toString(),
                    comment: comment
                }
            ]
        });

        return Promise.resolve();
    }
}
