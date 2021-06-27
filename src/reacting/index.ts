import { MessageReaction, User, PartialUser } from "discord.js";
import { GUILD_IDS, REACT_EMOJI } from "../constants";
import { rublertReaction } from "./rubl/rublerts";
// import { addComment, addMoney } from "../services/reacting/reacting";
import { IFetchClient } from "../services/FetchClient";
import dbFactory from "../utils/dbFactory";
import { APP_MODES } from "../types";

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
  // const username = user.username;
  //cine o scris aia -> ID
  const author = reaction.message.author.id;
  //canal pe care trebuie sa dea reply
  const channel = reaction.message.channel;


  switch(emojiName) {
  case REACT_EMOJI.RUBLERT: {
    const message = await rublertReaction();
    // console.log(message, username);
    console.log(reaction);
    break;
  }
  case REACT_EMOJI.STITCH: {
    const msgContent = reaction.message.content;
    BackendClient.addTransactions();
    // const author = reaction.message.author.id;
    // const channel = reaction.message.channel;
    // const res = await addComment(client, "http://localhost:3000/test/comment", { content: msgContent, author: author });
    // const res = await addMoney(client, "http://localhost:3000/test/user/reward", { author: author, howMuch: 50 });
    // await channel.send(res.message);
    await channel.send("Inca nu se pot da bani. Comming soon.");
    break;
  }

  default:
    console.log("am vazut ca ai reactionat la un emoji necunoscut");
    break;
  }
}