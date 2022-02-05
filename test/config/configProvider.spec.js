"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const configProvider_1 = require("../../src/config/configProvider");
describe('Config', () => {
    let config;
    beforeEach(() => {
        config = new configProvider_1.ConfigProvider();
    });
    it('should get a env variable', () => {
        const expectedValue = 'random value';
        process.env['RANDOM_TEST_VAR'] = expectedValue;
        const value = config.getEnv('RANDOM_TEST_VAR');
        assert_1.default.equal(value, expectedValue);
    });
    it('should alias Azure DevOps URI', () => {
        const expectedUri = 'https://random.com';
        process.env['AZURE_DEVOPS_URI'] = expectedUri;
        const value = config.azureDevOpsUri;
        assert_1.default.equal(value, expectedUri);
    });
    it('should alias Azure DevOps username', () => {
        const expectedUsername = 'my.username';
        process.env['AZURE_DEVOPS_USERNAME'] = expectedUsername;
        const value = config.username;
        assert_1.default.equal(value, expectedUsername);
    });
    it('should alias Azure DevOps Personal Access Token', () => {
        const expectedPat = 'my.pat';
        process.env['AZURE_DEVOPS_PAT'] = expectedPat;
        const value = config.pat;
        assert_1.default.equal(value, expectedPat);
    });
});
