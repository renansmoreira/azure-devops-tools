import {UserCredentials} from '../../../core/UserCredentials';
import {UserId} from '../../../core/userId';

export interface ExecutedCommand {
    getCredentials(userId: UserId): UserCredentials;
    deferReply(): Promise<void>;
    editReply(message: string): Promise<void>;
    getString(paramName: string): string;
}
