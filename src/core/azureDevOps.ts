import {ExecutedPipeline} from './executedPipeline';
import {PipelineId} from './pipelineId';
import {StageId} from './stageId';
import {StageStatus} from '../adapters/stageStatus';

export interface AzureDevOps {
    runPipeline(pipelineId: PipelineId, branchName: string): Promise<ExecutedPipeline>;

    approveStage(stageId: StageId, status: StageStatus, comment?: string): Promise<void>;
}
