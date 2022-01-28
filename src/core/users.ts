import {UserId} from './userId';
import {UserCredentials} from './userCredentials';

export interface Users {
    get(id: UserId): UserCredentials;
}
