import Discord, { MessageEmbed, EmbedField } from "discord.js";

export function createMessageEmbed(
  hexColor: string,
  title: string,
  description: string,
  fields: EmbedField[],
  author: string,
  footer: string
): MessageEmbed {
  const message: MessageEmbed = new Discord.MessageEmbed()
    .setColor(hexColor)
    .setTitle(title)
    .setDescription(description)
    .addFields(fields)
    .setAuthor(author)
    .setFooter(footer)
    .setTimestamp();

  return message;
}