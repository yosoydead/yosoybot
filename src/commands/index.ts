import { Message } from "discord.js";
import { CommandNames } from "./CommandNames";
import eightBall from "./eightBall";
import { ping, pong} from "./ping";
import { REPLY_MESSAGES } from "../constants";
import { cats} from "./cats";
import { displayCommands } from "./allCommands";

//command handler
//aici o sa fac o functie care primeste ca parametru un argument de tipul Message pe care o sa il analizez
//si o sa folosesc comanda care trebuie pentru asa ceva
// const regex = /^ball\s.+/i;

export async function commandHandler(message: Message) {
  // apare scenariul in care botul o sa isi raspunda la propriile mesaje, adica face o bucla infinita
  // ii dau short circuit direct cand vad ca mesajul e de la bot
  if (message.author.username === "yosoybot") return;
  
  //sparg mesajul in bucati si vreau sa vad care e primul cuvant din mesaj
  const splitMessage: string[] = message.content.split(" ");

  //daca mesajul nu incepe cu !, o sa ignor comanda
  if (splitMessage[0].charAt(0) !== "!") return;
  
  switch (splitMessage[0].substring(1)) {
  case CommandNames.EIGHT_BALL:
    if (splitMessage.length === 1) return await message.reply(REPLY_MESSAGES.EMPTY_EIGHT_BALL);
    return await message.reply(eightBall());
  case CommandNames.PING:
    return await message.reply(pong());
  case CommandNames.PONG:
    return await message.reply(ping());
  case CommandNames.CATS_FACT: {
    const catFact: string = await cats();
    if (catFact === "") return await message.reply(REPLY_MESSAGES.EMPTY_CATS_FACT);

    return await message.reply(catFact);
  }
  case CommandNames.COMMANDS:
    return await message.reply(displayCommands());
  default:
    return await message.reply(REPLY_MESSAGES.UNKNOWN_COMMAND);
  }
}