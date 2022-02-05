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
const discord_js_1 = require("discord.js");
const sinon_1 = __importDefault(require("sinon"));
const executedCommandWrapper_1 = require("../../src/presentations/discordbot/executedCommandWrapper");
const chai_1 = require("chai");
const userId_1 = require("../../src/core/userId");
describe('Executed command wrapper', () => {
    let userCredentials;
    let commandInteraction;
    let wrappedCommand;
    beforeEach(() => {
        userCredentials = {
            id: new userId_1.UserId('id'),
            username: 'username',
            pat: 'pat'
        };
        commandInteraction = sinon_1.default.createStubInstance(discord_js_1.CommandInteraction);
        wrappedCommand = new executedCommandWrapper_1.ExecutedCommandWrapper(userCredentials, commandInteraction);
    });
    it('should get user command credentials', () => {
        const foundUserCredentials = wrappedCommand.credentials;
        chai_1.assert.deepEqual(userCredentials, foundUserCredentials);
    });
    it('should defer reply', () => {
        wrappedCommand.deferReply();
        sinon_1.default.assert.called(commandInteraction.deferReply);
    });
    it('should edit reply', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedMessage = 'Message';
        yield wrappedCommand.editReply(expectedMessage);
        sinon_1.default.assert.called(commandInteraction.editReply.withArgs(expectedMessage));
    }));
    [
        ['message', 'Hello'],
        ['name', 'My name']
    ].forEach(([paramName, paramValue]) => {
        it(`should get a command parameter: ${paramName}`, () => {
            const options = sinon_1.default.createStubInstance(discord_js_1.CommandInteractionOptionResolver);
            commandInteraction.options = options;
            options.getString.withArgs(paramName).returns(paramValue);
            const message = wrappedCommand.getString(paramName);
            chai_1.assert.equal(paramValue, message);
        });
    });
});
