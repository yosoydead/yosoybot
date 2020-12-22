import { Message } from "discord.js";
import { CommandNames } from "./CommandNames";
import eightBall from "./eightBall/eightBall";
import { ping, pong} from "./ping/ping";
import { REPLY_MESSAGES } from "../constants";
import { cats} from "./cats/cats";
import { dogs } from "./dogs/dogs";
import { displayCommands } from "./allCommands/allCommands";
import { doesMessageContainWeebAndTag, weeb } from "./weeb/weeb";
import { IFetchClient } from "../services/FetchClient";
import { meteo } from "./meteo/meteo";

//command handler
//aici o sa fac o functie care primeste ca parametru un argument de tipul Message pe care o sa il analizez
//si o sa folosesc comanda care trebuie pentru asa ceva
// const regex = /^ball\s.+/i;
export async function commandHandler(message: Message, client: IFetchClient): Promise<Message | undefined> {
  
  // apare scenariul in care botul o sa isi raspunda la propriile mesaje, adica face o bucla infinita
  // ii dau short circuit direct cand vad ca mesajul e de la bot
  if (message.author.username === "yosoybot") return;
  
  //sparg mesajul in bucati si vreau sa vad care e primul cuvant din mesaj
  const splitMessage: string[] = message.content.split(" ");
  
  // verific daca mesajul contine un @user si weeb inainte sa procesez comenzile
  // am pus spatiu acolo pentru ca vreau sa fie @user \n <ascii>
  const containsWeebAndTag = doesMessageContainWeebAndTag(splitMessage);
  if (containsWeebAndTag.weeb && containsWeebAndTag.tagging) return await message.channel.send(`${containsWeebAndTag.tag} 
  ${weeb()}`);

  //daca mesajul nu incepe cu !, o sa ignor comanda
  if (splitMessage[0].charAt(0) !== "%") return;
  // console.log("mesaj",message);
  
  // trec prin fiecare tip de comanda si ii dau sa faca ceva
  switch (splitMessage[0].substring(1)) {
  case CommandNames.EIGHT_BALL:
    if (splitMessage.length === 1) return await message.reply(REPLY_MESSAGES.EMPTY_EIGHT_BALL);
    return await message.reply(eightBall());
  case CommandNames.PING:
    return await message.reply(pong());
  case CommandNames.PONG:
    return await message.reply(ping());
  case CommandNames.CATS_FACT: {
    const catFact: string = await cats(client);
    return await message.reply(catFact);
  }
  case CommandNames.DOGS_FACT: {
    const dogFacts: string = await dogs(client);
    return await message.reply(dogFacts);
  }
  case CommandNames.COMMANDS:
    return await message.reply(displayCommands());
  case CommandNames.METEO:
  case CommandNames.WEATHER: {
    if (splitMessage.length === 1) return await message.reply("Comanda accepta 2 parametri: **obligatoriu** - *numele orasului* si **optional** - *codul tarii*. Daca nu pui codul tarii, o sa returneze primul oras pe care il gaseste chiar daca sunt mai multe cu acelasi nume in lume. Exemplu: %meteo **hell** **--no**. Pentru codul unei tari poti folosi: https://www.iban.com/country-codes");
   
    const messageLength = splitMessage.length - 1;
    // daca ultimul element din arrayul de mesaj contine --<codul unei tari>, caut meteo despre orasul in tara respectiva
    if (splitMessage[messageLength].includes("--")) {
      const _countryCode: string = splitMessage[messageLength].substring(2);
      const _city = splitMessage.slice(1, messageLength).join(" ");
      const weather = await meteo(client, process.env.OPEN_WEATHER_API!, _city, _countryCode); 
      
      return await message.reply(weather);
    }

    //0: comanda meteo
    //1: oras - exista orase cu spatiu in nume (ex: New York, Drobeta-Turnu Severin, Piatra Neamt, etc)
    const city: string = splitMessage.slice(1).join(" ");
    const result = await meteo(client, process.env.OPEN_WEATHER_API!, city);

    return await message.reply(result);
  }
  default:
    return await message.reply(REPLY_MESSAGES.UNKNOWN_COMMAND);
  }
}