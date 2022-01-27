import dotenv from 'dotenv';
import {Client, Intents, Interaction} from 'discord.js';
import commandExecutor from './commandExecutor';
import {ConfigJsonProvider} from '../../config/configJsonProvider';

dotenv.config();
const config = new ConfigJsonProvider();

(async function () {
    const client = new Client({intents: [Intents.FLAGS.GUILDS]});

    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        await commandExecutor(config, interaction);
    });

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.login(config.discordToken);
})();
