import { CommandsObject } from "../CommandNames";
import { MessageEmbed, EmbedField } from "discord.js";
import { createEmbedFields } from "../../utils/createEmbedFields";
import { createMessageEmbed } from "../../utils/createMessageEmbed";
import { MESSAGE_COLORS, REPLY_MESSAGES } from "../../constants";

export function displayCommands(): MessageEmbed {
  const embedFields: EmbedField[] = createEmbedFields(CommandsObject);
  const message: MessageEmbed = createMessageEmbed(
    MESSAGE_COLORS.DEFAULT,
    REPLY_MESSAGES.COMMANDS_TITLE,
    REPLY_MESSAGES.COMMANDS_DESCRIPTION,
    embedFields,
    "Yosoydead",
    REPLY_MESSAGES.COMMANDS_FOOTER
  );

  return message;
}