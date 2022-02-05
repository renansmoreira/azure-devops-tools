import * as dotenv from 'dotenv';
import {Client, Intents, Interaction} from 'discord.js';
import {ConfigProvider} from '../../config/configProvider';
import {UserProvider} from '../../adapters/userProvider';
import {CommandExecutor} from './commandExecutor';
import commands from './commands';
import {LoggerProvider} from '../../adapters/loggerProvider';


(async function () {
    dotenv.config();

    const config = new ConfigProvider();
    const users = new UserProvider(config);
    const client = new Client({intents: [Intents.FLAGS.GUILDS]});
    const logger = new LoggerProvider();
    const commandExecutor = new CommandExecutor(users, commands, logger);

    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        await commandExecutor.execute(interaction);
    });

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.login(config.discordToken);
})();
