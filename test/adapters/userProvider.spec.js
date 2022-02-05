"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const userId_1 = require("../../src/core/userId");
const userProvider_1 = require("../../src/adapters/userProvider");
const sinon_1 = __importDefault(require("sinon"));
const configProvider_1 = require("../../src/config/configProvider");
describe('User provider', () => {
    let config = sinon_1.default.createStubInstance(configProvider_1.ConfigProvider);
    let userProvider;
    beforeEach(() => {
        config = sinon_1.default.createStubInstance(configProvider_1.ConfigProvider);
        config.getEnv.withArgs('USERS_CONFIG_PATH').returns('./test/testUsers.json');
        userProvider = new userProvider_1.UserProvider(config);
    });
    [
        ['123', 'username1', 'pat1'],
        ['333', 'username2', 'pat2']
    ].forEach(([id, username, pat]) => {
        it(`should get a user credentials for: ${id}`, () => {
            const userId = new userId_1.UserId(id);
            const expectedUserCredentials = {
                id: userId,
                username: username,
                pat: pat
            };
            const userCredentials = userProvider.get(userId);
            chai_1.assert.deepEqual(expectedUserCredentials, userCredentials);
        });
    });
    it('should not get a unknown user credentials', () => {
        const unknownUserId = new userId_1.UserId('unknown user id');
        const act = () => userProvider.get(unknownUserId);
        chai_1.assert.throws(act, Error, 'User not found');
    });
});
