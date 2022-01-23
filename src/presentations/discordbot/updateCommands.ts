import dotenv from 'dotenv';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import commands from './commands';
import {DiscordCommand} from './commands/discordCommand';
import {Config} from '../../config/config';

dotenv.config();
const config = new Config();

(async function () {
    const rest = new REST({version: '9'}).setToken(config.discordToken);
    const options = {
        body: commands.map((command: DiscordCommand) => command.commandBuilder.toJSON())
    }

    await rest.put(Routes.applicationGuildCommands(config.discordApplicationId, config.discordGuildId), options);

    console.log('Bot slash commands updated!');
})();
