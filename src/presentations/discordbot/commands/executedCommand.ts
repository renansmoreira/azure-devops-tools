import {UserCredentials} from '../../../core/userCredentials';

export interface ExecutedCommand {
    get credentials(): UserCredentials;
    deferReply(): Promise<void>;
    editReply(message: string): Promise<void>;
    getString(paramName: string): string;
}
