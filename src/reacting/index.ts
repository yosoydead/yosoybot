import { MessageReaction, User, PartialUser, Message, MessageAttachment } from "discord.js";
import { GUILD_IDS, REACT_EMOJI, USER_IDS } from "../constants";
import { rublertReaction } from "./rubl/rublerts";
import { IFetchClient } from "../services/FetchClient";
import dbFactory from "../utils/dbFactory";
import { APP_MODES, MessageContentAndAttachment } from "../types";
import cacheFactory from "../utils/cacheFactory";

export function msgContentAndAttachment(message: Message): MessageContentAndAttachment {
  const msgText: string = message.content;
  const msgAttachment: MessageAttachment[] = message.attachments.array();

  return {
    content: msgText,
    attachments: msgAttachment,
    authorUsername: message.author.username
  };
}

export function determineTransactionReason(msgContents: MessageContentAndAttachment): string {
  let reason;
  if (msgContents.content === "" && msgContents.attachments.length > 0) {
    reason = `Ai dat react lui ${msgContents.authorUsername}. Am stocat doar un link de imagine pt dovada: ${msgContents.attachments[0].url}`;
  } else if (msgContents.content !== "" && msgContents.attachments.length === 0) {
    reason = `Ai dat react lui ${msgContents.authorUsername}. Mesajul a fost: ${msgContents.content}`;
  } else if (msgContents.content !== "" && msgContents.attachments.length > 0) {
    reason = `Ai dat react lui ${msgContents.authorUsername}. Text: ${msgContents.content}. Poza: ${msgContents.attachments[0].url}`;
  } else {
    reason = "Cred ca ceva s-o dus in cacat si nu am salvat ce trebuie?";
  }

  return reason;
}

// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// ----(nu cred/nu stiu daca are acces la mesajele din istoric)---- nu mai e valabil
// practic, ce se intampla e ca poti sa faci rost de id-ul mesajului la care se da react
// apoi, il cauti in istoric si vezi continutul. downside: probabil dureaza mult sau poate da fail
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
    reaction.message.channel.messages.fetch(messageID)
      .then((foundMessage: Message) => {
        if (foundMessage.author.id === USER_IDS.YOSOYBOT) return Promise.resolve("Nu o sa iau in considerare tranzactiile pe numele botului.");

        const contents = msgContentAndAttachment(foundMessage);
        const reason = determineTransactionReason(contents);

        cacheFactory.getInstance().updateTransactionStore({
          cost: -1,
          discordUserId: user.id,
          reason: reason,
          status: "pending"
        });

        return Promise.resolve("Trimis tranzactia in cache");
      })
      .then((backendResult) => {
        console.log(backendResult);
      })
      .catch(err => {
        console.log("mesaj cautat eroare", err);
      });
    break;
  }
  case REACT_EMOJI.STITCH: {
    reaction.message.channel.messages.fetch(messageID)
      .then((foundMessage: Message) => {
        if (foundMessage.author.id === USER_IDS.YOSOYBOT) return Promise.resolve("Nu o sa iau in considerare tranzactiile pe numele botului.");

        const contents = msgContentAndAttachment(foundMessage);
        const reason = determineTransactionReason(contents);

        return BackendClient.addTransactions([
          {
            cost: 10,
            discordUserId: "405081094057099276",
            reason: reason,
            status: "pending"
          },
          {
            cost: -10,
            discordUserId: "405081094057099276",
            reason: reason,
            status: "pending"
          },
          {
            cost: 20,
            discordUserId: "405081094057099276",
            reason: reason,
            status: "pending"
          },
          {
            cost: -100,
            discordUserId: "405081094057099276",
            reason: reason,
            status: "pending"
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