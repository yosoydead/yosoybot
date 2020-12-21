import Discord, { MessageEmbed, EmbedField } from "discord.js";
import { MESSAGE_COLORS } from "../constants";

export function createMessageEmbed(
  hexColor: MESSAGE_COLORS,
  title: string,
  description: string,
  fields: EmbedField[],
  author: string,
  footer: string
): MessageEmbed {
  // ar trebui sa iau in considerare ca poate o sa uit sa pun vreo valoare la unul din parametri
  const _t = title === "" ? "<unknown title>" : title;
  const _d = description === "" ? "<unknown description>" : description;
  const _a = author === "" ? "<unknown author>" : author;
  const _f = footer === "" ? "<unknown footer>" : footer;

  const message: MessageEmbed = new Discord.MessageEmbed()
    .setColor(hexColor)
    .setTitle(_t)
    .setDescription(_d)
    .addFields(fields)
    .setAuthor(_a)
    .setFooter(_f)
    .setTimestamp();

  return message;
}