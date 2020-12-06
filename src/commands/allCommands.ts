import { CommandsObject, TypeCommandObject } from "./CommandNames";
import Discord, { MessageEmbed, EmbedField } from "discord.js";

export function createEmbedFields(allCommands: TypeCommandObject): EmbedField[] {
  const commands = Object.keys(allCommands);
  const commandsWithDescription: EmbedField[] = [];

  for (let i = 0; i < commands.length; i++) {
    const entry: EmbedField = {
      name: commands[i],
      value: CommandsObject[commands[i]],
      inline: false
    };

    commandsWithDescription.push(entry);
  }
  
  return commandsWithDescription;
}

export function displayCommands(): MessageEmbed {
  const embedFields: EmbedField[] = createEmbedFields(CommandsObject);
  
  const message: MessageEmbed = new Discord.MessageEmbed()
    .setColor("#3f51b5")
    .setTitle("Hi. I am yosoybot!")
    .setDescription("Here is a list of all my current commands:")
    .addFields(embedFields)
    .setAuthor("Yosoydead")
    .setFooter("Much love. @yosoydead#9299 for other questions.")
    .setTimestamp();

  return message;
}