// functia asta o sa primeasca ca parametru un Guild
// o sa caute in tot ala, serverul meu, Yosoydead, si o sa se duca pe canalul de intrat-pe-canale
// acolo, o sa faca log pentru fiecare server pe care o intrat sau o iesit
import { Guild, EmbedField, MessageEmbed } from "discord.js";
import { SERVER_ACTION, MESSAGE_COLORS } from "../constants";
import { TypeCommandObject } from "../commands/CommandNames";
import { createEmbedFields } from "./createEmbedFields";
import { createMessageEmbed } from "./createMessageEmbed";

export const colorSelect = (action: SERVER_ACTION): string => {
  return action === SERVER_ACTION.JOIN ? MESSAGE_COLORS.CHANNEL_JOIN : MESSAGE_COLORS.CHANNEL_LEFT;
};

export const whatHappened = (guildName: string, action: SERVER_ACTION): TypeCommandObject => {
  const name = guildName === "" ? "<unknown server name>" : guildName;
  const join: TypeCommandObject = { 
    "Numele serverului pe care am intrate: ": name
  };

  const left: TypeCommandObject = {
    "Numele serverului de pe care am fost dat afara: ": name
  };

  return action === SERVER_ACTION.JOIN ? join : left;
};

export function sendLogs(guild: Guild, action: SERVER_ACTION): MessageEmbed {
  const color: string = colorSelect(action);
  const event = whatHappened(guild.name, action);
  const fields: EmbedField[] = createEmbedFields(event);
  const message: MessageEmbed = createMessageEmbed(
    color,
    action === SERVER_ACTION.JOIN ? "Yosoybot o intrat pe un server" : "Yosoybot o fost dat afara de pe un server",
    action === SERVER_ACTION.JOIN ? "Boss, am intrat pe un server" : "Boss, vezi ca am fost dat afara de pe un server",
    fields,
    "Yosoybot",
    "Ne miscam"
  );

  return message;
}