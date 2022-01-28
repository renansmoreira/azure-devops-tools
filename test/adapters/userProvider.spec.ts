import {assert} from 'chai';
import {UserId} from '../../src/core/userId';
import {UserProvider} from '../../src/adapters/userProvider';
import sinon, {SinonStubbedInstance} from 'sinon';
import {ConfigProvider} from '../../src/config/configProvider';
import {UserCredentials} from '../../src/core/userCredentials';
import {Users} from '../../src/core/users';

describe('User provider', () => {
    let config: SinonStubbedInstance<ConfigProvider> = sinon.createStubInstance(ConfigProvider);
    let userProvider: Users;

    beforeEach(() => {
        config = sinon.createStubInstance(ConfigProvider);
        config.getEnv.withArgs('USERS_CONFIG_PATH').returns('./test/testUsers.json');
        userProvider = new UserProvider(config);
    });

    [
        ['123', 'username1', 'pat1'],
        ['333', 'username2', 'pat2']
    ].forEach(([id, username, pat]) => {
        it(`should get a user credentials for: ${id}`, () => {
            const userId = new UserId(id);
            const expectedUserCredentials: UserCredentials = {
                id: userId,
                username: username,
                pat: pat
            };

            const userCredentials = userProvider.get(userId);

            assert.deepEqual(expectedUserCredentials, userCredentials);
        });
    });

    it('should not get a unknown user credentials', () => {
        const unknownUserId = new UserId('unknown user id');

        const act = () => userProvider.get(unknownUserId);

        assert.throws(act, Error, 'User not found');
    });
});
