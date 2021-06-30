import { MessageReaction, User, PartialUser, Message, MessageAttachment } from "discord.js";
import { GUILD_IDS, REACT_EMOJI } from "../constants";
import { rublertReaction } from "./rubl/rublerts";
import { IFetchClient } from "../services/FetchClient";
import dbFactory from "../utils/dbFactory";
import { APP_MODES, MessageContentAndAttachment } from "../types";

export function msgContentAndAttachment(message: Message): MessageContentAndAttachment {
  const msgText: string = message.content;
  const msgAttachment: MessageAttachment[] = message.attachments.array();

  return {
    content: msgText,
    attachments: msgAttachment,
    authorUsername: message.author.username
  };
}

// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// nu cred/nu stiu daca are acces la mesajele din istoric
export async function reactionHandler(reaction: MessageReaction, user: User | PartialUser, client: IFetchClient) {
  const BackendClient = dbFactory.getInstance();
  // nu da mesaj pe prod cand esti pe local
  if (BackendClient.getAppMode() === APP_MODES.LOCAL && reaction.message.guild?.id === GUILD_IDS.GOKU_SERVER) return;
  // nu da mesaj pe local cand esti pe prod
  if (BackendClient.getAppMode() === APP_MODES.PROD && reaction.message.guild?.id === GUILD_IDS.YOSOYDEAD_SERVER) return;
  
  const emojiName = reaction.emoji.name;
  const messageID = reaction.message.id;

  switch(emojiName) {
  case REACT_EMOJI.RUBLERT: {
    const message = await rublertReaction();
    // console.log(message, username);
    console.log(reaction);
    break;
  }
  case REACT_EMOJI.STITCH: {
    console.log("stitch");
    reaction.message.channel.messages.fetch(messageID)
      .then((foundMessage: Message) => {
        const contents = msgContentAndAttachment(foundMessage);
        let reason;
        if (contents.content === "" && contents.attachments.length > 0) {
          reason = `Ai dat react lui ${contents.authorUsername}. Am stocat doar un link de imagine pt dovada: ${contents.attachments[0].url}`;
        } else if (contents.content !== "" && contents.attachments.length === 0) {
          reason = `Ai dat react lui ${contents.authorUsername}. Mesajul a fost: ${contents.content}`;
        } else if (contents.content !== "" && contents.attachments.length > 0) {
          reason = `Ai dat react lui ${contents.authorUsername}. Text: ${contents.content}. Poza: ${contents.attachments[0].url}`;
        } else {
          reason = "Cred ca ceva s-o dus in cacat si nu am salvat ce trebuie?";
        }

        return BackendClient.addTransactions([
          {
            cost: 10,
            discordUserId: "405081094057099276",
            reason: reason
          },
        ]);
      })
      .then((backendResult) => {
        console.log(backendResult);
      })
      .catch(err => {
        console.log("mesaj cautat eroare", err);
      });
    break;
  }

  default:
    console.log("am vazut ca ai reactionat la un emoji necunoscut");
    break;
  }
}