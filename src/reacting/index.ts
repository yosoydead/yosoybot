import { MessageReaction, User, PartialUser } from "discord.js";
import fetch from "node-fetch";
import { REACT_EMOJI } from "../constants";
import { rublertReaction } from "./rubl/rublerts";
// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// nu cred/nu stiu daca are acces la mesajele din istoric
export async function reactionHandler(reaction: MessageReaction, user: User | PartialUser) {
  const emojiName = reaction.emoji.name;
  const username = user.username;


  switch(emojiName) {
  case REACT_EMOJI.RUBLERT: {
    const message = await rublertReaction();
    console.log(message, username);
    break;
  }
  case REACT_EMOJI.STITCH: {
    // console.log("am vazut ca ai reactionat cu stitch", username);
    console.log(reaction);
    const author = reaction.message.author.id;
    fetch("http://localhost:3000/test/user/reward", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({author: author, howMuch: 50})
    });
    break;
  }

  default:
    console.log("am vazut ca ai reactionat la un emoji necunoscut");
    break;
  }
}