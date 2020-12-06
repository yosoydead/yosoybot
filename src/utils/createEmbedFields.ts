import { TypeCommandObject } from "../commands/CommandNames";
import { EmbedField } from "discord.js";

export function createEmbedFields(entriesObject: TypeCommandObject): EmbedField[] {
  const commands = Object.keys(entriesObject);
  const commandsWithDescription: EmbedField[] = [];

  for (let i = 0; i < commands.length; i++) {
    const entry: EmbedField = {
      name: commands[i],
      value: entriesObject[commands[i]],
      inline: false
    };

    commandsWithDescription.push(entry);
  }
  
  return commandsWithDescription;
}