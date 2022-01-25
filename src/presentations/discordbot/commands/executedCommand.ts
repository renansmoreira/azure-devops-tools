export interface ExecutedCommand {
    getString(paramName: string): string;
    deferReply(): Promise<void>;
    editReply(message: string): Promise<void>;
}
