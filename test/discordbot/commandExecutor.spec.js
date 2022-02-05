"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const pipelineCommand_1 = require("../../src/presentations/discordbot/commands/pipelineCommand");
const commandExecutor_1 = require("../../src/presentations/discordbot/commandExecutor");
const userProvider_1 = require("../../src/adapters/userProvider");
const discord_js_1 = require("discord.js");
const executedCommandWrapper_1 = require("../../src/presentations/discordbot/executedCommandWrapper");
const userId_1 = require("../../src/core/userId");
const chai_1 = require("chai");
const LoggerProvider_1 = require("../../src/adapters/LoggerProvider");
describe('Command executor', () => {
    let userCredentials;
    let users;
    let commandStub;
    let commandExecutor;
    let logger;
    beforeEach(() => {
        userCredentials = {
            id: new userId_1.UserId('id'),
            username: 'username',
            pat: 'pat'
        };
        users = sinon_1.default.createStubInstance(userProvider_1.UserProvider);
        users.get.withArgs(userCredentials.id).returns(userCredentials);
        commandStub = sinon_1.default.createStubInstance(pipelineCommand_1.PipelineCommand);
        logger = sinon_1.default.createStubInstance(LoggerProvider_1.LoggerProvider);
        commandExecutor = new commandExecutor_1.CommandExecutor(users, [commandStub], logger);
    });
    it('should execute a command including user credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const interaction = createStubbedCommandInteraction(commandStub.name);
        addStubbedDiscordUser(interaction);
        const commandWrapper = new executedCommandWrapper_1.ExecutedCommandWrapper(userCredentials, interaction);
        yield commandExecutor.execute(interaction);
        chai_1.assert.isTrue(commandStub.execute.calledOnceWith(commandWrapper));
    }));
    it('should not execute a invalid command', () => __awaiter(void 0, void 0, void 0, function* () {
        const interaction = createStubbedCommandInteraction('unknown command name');
        yield commandExecutor.execute(interaction);
        chai_1.assert.isTrue(commandStub.execute.notCalled);
    }));
    it('should reply errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedReply = { content: 'There was an error while executing this command!', ephemeral: true };
        const interaction = createStubbedCommandInteraction(commandStub.name);
        addStubbedDiscordUser(interaction);
        commandStub.execute.throws(Error);
        yield commandExecutor.execute(interaction);
        chai_1.assert.isTrue(interaction.reply.calledOnceWith(expectedReply));
    }));
    it('should log errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const interaction = createStubbedCommandInteraction(commandStub.name);
        addStubbedDiscordUser(interaction);
        const expectedError = new Error('random error');
        commandStub.execute.throws(expectedError);
        yield commandExecutor.execute(interaction);
        chai_1.assert.isTrue(logger.error.calledOnceWith(expectedError));
    }));
    function createStubbedCommandInteraction(name) {
        const interaction = sinon_1.default.createStubInstance(discord_js_1.CommandInteraction);
        interaction.commandName = name;
        return interaction;
    }
    function addStubbedDiscordUser(interaction) {
        const discordUser = sinon_1.default.createStubInstance(discord_js_1.User);
        discordUser.id = userCredentials.id.toString();
        interaction.user = discordUser;
    }
});
