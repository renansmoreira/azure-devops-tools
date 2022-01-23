import dotenv from 'dotenv';
import {Client, Intents, Interaction} from 'discord.js';
import commandExecutor from './commands/commandExecutor';
import {Config} from '../../config/config';

dotenv.config();
const config = new Config();

(async function () {
    const client = new Client({intents: [Intents.FLAGS.GUILDS]});

    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        await commandExecutor(interaction);
    });

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.login(config.discordToken);
})();
