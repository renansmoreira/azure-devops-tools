export class Config {
    getEnv(name: string): string {
        return process.env[name] || '';
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
}
