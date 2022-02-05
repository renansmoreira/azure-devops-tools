import {UserCredentials} from '../../../core/userCredentials';

export interface ExecutedCommand {
    getCredentials(): UserCredentials;
    deferReply(): Promise<void>;
    editReply(message: string): Promise<void>;
    getString(paramName: string): string;
}
