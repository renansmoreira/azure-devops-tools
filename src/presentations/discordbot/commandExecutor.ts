import {CommandInteraction} from 'discord.js';
import commands from './commands';
import {DiscordCommand} from './commands/discordCommand';
import {ExecutedCommandWrapper} from './executedCommandWrapper';

export default async function (interaction: CommandInteraction) {
    const command = commands.find((discordCommand: DiscordCommand) => discordCommand.name === interaction.commandName);
    if (command) {
        try {
            await command.execute(new ExecutedCommandWrapper(interaction));
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}
