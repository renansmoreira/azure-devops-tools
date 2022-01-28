export interface Config {
    getEnv(name: string): string;

    get usersConfigPath(): string;

    get azureDevOpsUri(): string;

    get username(): string;

    get pat(): string;

    get discordToken(): string;

    get discordApplicationId(): string;

    get discordGuildId(): string;
}
