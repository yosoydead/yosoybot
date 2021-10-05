import { MessageReaction, User, PartialUser, Message, MessageAttachment } from "discord.js";
import { GUILD_IDS, REACT_EMOJI, USER_IDS } from "../constants";
import { IFetchClient } from "../services/FetchClient";
import dbFactory from "../utils/dbFactory";
import { APP_MODES, BackendTransaction, MessageContentAndAttachment } from "../types";
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
    reason = `Am stocat doar un link de imagine pt dovada: ${msgContents.attachments[0].url}.`;
  } else if (msgContents.content !== "" && msgContents.attachments.length === 0) {
    reason = `Mesajul a fost: ${msgContents.content}.`;
  } else if (msgContents.content !== "" && msgContents.attachments.length > 0) {
    reason = `Text: ${msgContents.content}. Poza: ${msgContents.attachments[0].url}.`;
  } else {
    reason = `Ceva necunoscut. Probabil un sticker sau ceva atasament dubios.`;
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
        if (foundMessage.author.id === user.id) return Promise.resolve("Cum ar fi sa iti dai singur bani :kekw:");

        const contents = msgContentAndAttachment(foundMessage);
        const reason = determineTransactionReason(contents);
        const transactionsSet: BackendTransaction[] = [
          {
            reason: `Ai dat react. ${reason}`,
            discordUserId: user.id,
            cost: -1,
            status: "pending",
            type: "give",
            receiverDiscordUserId: foundMessage.author.id,
            receiverDiscordUsername: foundMessage.author.username
          },
          {
            cost: 1,
            discordUserId: foundMessage.author.id,
            status: "pending",
            reason: `Ai primit 1 ban. ${reason}`,
            type: "receive",
            initiatorDiscordUserId: user.id,
            initiatorDiscordUsername: user.username!
          }
        ];

        cacheFactory.getInstance().updateTransactionStore(transactionsSet);

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
        const transactionsSet: BackendTransaction[] = [
          {
            reason: `Ai dat react lui ${reason}`,
            discordUserId: user.id,
            cost: -1,
            status: "pending",
            type: "give",
            receiverDiscordUserId: foundMessage.author.id,
            receiverDiscordUsername: foundMessage.author.username
          },
          {
            cost: 1,
            discordUserId: foundMessage.author.id,
            status: "pending",
            reason: `Ai primit 1 ban din partea lui ${reason}`,
            type: "receive",
            initiatorDiscordUserId: user.id,
            initiatorDiscordUsername: user.username!
          }
        ];
        cacheFactory.getInstance().updateTransactionStore(transactionsSet);

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

  default:
    console.log("am vazut ca ai reactionat la un emoji necunoscut", reaction.emoji.name);
    break;
  }
}
