import {UserId} from './userId';

export interface UserCredentials {
    get id(): UserId;
    get username(): string;
    get pat(): string;
}
