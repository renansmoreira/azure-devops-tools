import dotenv from 'dotenv';
import {Client, Intents} from 'discord.js';
import commandExecutor from './commands/commandExecutor';

dotenv.config();

(async function () {
    const discordToken = process.env['DISCORD_TOKEN'] || '';
    const client = new Client({intents: [Intents.FLAGS.GUILDS]});

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;
        await commandExecutor(interaction);
    });

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.login(discordToken);
})();
