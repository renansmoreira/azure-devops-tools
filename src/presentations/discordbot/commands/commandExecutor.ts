import {CommandInteraction} from 'discord.js';
import commands from './index';
import {DiscordCommand} from './discordCommand';

export default async function (interaction: CommandInteraction) {
    const command = commands.find((discordCommand: DiscordCommand) => discordCommand.name === interaction.commandName);
    if (command) {
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}
