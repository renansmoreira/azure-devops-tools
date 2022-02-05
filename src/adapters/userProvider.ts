import {Users} from '../core/users';
import {UserId} from '../core/userId';
import {UserCredentials} from '../core/userCredentials';
import * as fs from 'fs';
import {UsersConfig} from '../core/usersConfig';
import {Config} from '../core/config';

export class UserProvider implements Users {
    private readonly _usersCredentials: Map<string, UserCredentials>;

    constructor(config: Config) {
        this._usersCredentials = new Map();
        this.mapUsers(config);
    }

    get(id: UserId): UserCredentials {
        const userCredentials = this._usersCredentials.get(id.toString());

        if (!userCredentials)
            throw new Error('User not found');

        return userCredentials;
    }

    private mapUsers(config: Config) {
        const configFile = fs.readFileSync(config.usersConfigPath);
        const usersConfig = JSON.parse(configFile.toString()) as unknown as UsersConfig;

        usersConfig.usersCredentials.forEach(
            (userCredentials: UserCredentials) => this._usersCredentials.set(userCredentials.id.toString(), {
                id: new UserId(userCredentials.id.toString()),
                username: userCredentials.username,
                pat: userCredentials.pat
            }));
    }
}
