import {Config} from '../core/config';

export class ConfigProvider implements Config {
    getEnv(name: string): string {
        return process.env[name] || '';
    }

    get usersConfigPath(): string {
        return this.getEnv('USERS_CONFIG_PATH');
    }

    public get azureDevOpsUri(): string {
        return this.getEnv('AZURE_DEVOPS_URI');
    }

    public get username(): string {
        return this.getEnv('AZURE_DEVOPS_USERNAME');
    }

    public get pat(): string {
        return this.getEnv('AZURE_DEVOPS_PAT');
    }

    public get discordToken(): string {
        return this.getEnv('DISCORD_TOKEN');
    }

    public get discordApplicationId(): string {
        return this.getEnv('DISCORD_APPLICATION_ID');
    }

    public get discordGuildId(): string {
        return this.getEnv('DISCORD_GUILD_ID');
    }
}

