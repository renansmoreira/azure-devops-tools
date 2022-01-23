import dotenv from 'dotenv';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import commands from './commands';
import {DiscordCommand} from './commands/discordCommand';

dotenv.config();

(async function () {
    const discordToken = process.env['DISCORD_TOKEN'] || '';
    const discordApplicationId = process.env['DISCORD_APPLICATION_ID'] || '';
    const discordGuildId = process.env['DISCORD_GUILD_ID'] || '';
    const rest = new REST({version: '9'}).setToken(discordToken);
    const options = {
        body: commands.map((command: DiscordCommand) => command.commandBuilder.toJSON())
    }

    await rest.put(Routes.applicationGuildCommands(discordApplicationId, discordGuildId), options);

    console.log('Bot slash commands updated!');
})();
