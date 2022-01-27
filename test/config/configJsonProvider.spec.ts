import assert from 'assert';
import { Config } from '../../src/config/config';


describe('Config', () => {
    let config: Config;

    beforeEach(() => {
        config = new Config();
    });

    it('should get a env variable', () => {
        const expectedValue = 'random value';
        process.env['RANDOM_TEST_VAR'] = expectedValue;

        const value = config.getEnv('RANDOM_TEST_VAR');

        assert.equal(value, expectedValue);
    });

    it('should alias Azure DevOps URI', () => {
        const expectedUri = 'https://random.com';
        process.env['AZURE_DEVOPS_URI'] = expectedUri;

        const value = config.azureDevOpsUri;

        assert.equal(value, expectedUri);
    });

    it('should alias Azure DevOps username', () => {
        const expectedUsername = 'my.username';
        process.env['AZURE_DEVOPS_USERNAME'] = expectedUsername;

        const value = config.username;

        assert.equal(value, expectedUsername);
    });

    it('should alias Azure DevOps Personal Access Token', () => {
        const expectedPat = 'my.pat';
        process.env['AZURE_DEVOPS_PAT'] = expectedPat;

        const value = config.pat;

        assert.equal(value, expectedPat);
    });
});