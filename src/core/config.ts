import {UserId} from './userId';
import {UserCredentials} from './UserCredentials';

export interface Config {
    getEnv(name: string): string;

    getCredentials(userId: UserId): UserCredentials;

    get azureDevOpsUri(): string;

    get username(): string;

    get pat(): string;

    get discordToken(): string;

    get discordApplicationId(): string;

    get discordGuildId(): string;
}
