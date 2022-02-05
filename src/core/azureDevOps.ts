import {ExecutedPipeline} from './executedPipeline';
import {PipelineId} from './pipelineId';
import {StageId} from './stageId';
import {StageStatus} from '../adapters/stageStatus';
import {UserCredentials} from './userCredentials';

export interface AzureDevOps {
    runPipeline(userCredentials: UserCredentials, pipelineId: PipelineId, branchName: string): Promise<ExecutedPipeline>;

    approveStage(stageId: StageId, status: StageStatus, comment?: string): Promise<void>;
}
