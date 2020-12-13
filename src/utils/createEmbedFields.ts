import { TypeCommandObject } from "../commands/CommandNames";
import { EmbedField } from "discord.js";

export function createEmbedFields(entriesObject: TypeCommandObject): EmbedField[] {
  const commands = Object.keys(entriesObject);
  const commandsWithDescription: EmbedField[] = [];

  if (commands.length === 1 && commands[0] === "") return commandsWithDescription;

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "" || entriesObject[commands[i]] === "") continue;

    const entry: EmbedField = {
      name: commands[i],
      value: entriesObject[commands[i]],
      inline: false
    };

    commandsWithDescription.push(entry);
  }
  
  return commandsWithDescription;
}