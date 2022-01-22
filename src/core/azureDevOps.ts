import { ExecutedPipeline } from './executedPipeline';
import { PipelineId } from './pipelineId';

export interface AzureDevOps {
    runPipeline(pipelineId: PipelineId, branchName: string): Promise<ExecutedPipeline>;
}
