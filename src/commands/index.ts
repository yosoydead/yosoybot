import { GuildMember, Message } from "discord.js";
import { CommandNames } from "./CommandNames";
import eightBall from "./eightBall/eightBall";
import { ping, pong} from "./ping/ping";
import { MY_CHANNEL_IDS, REPLY_MESSAGES } from "../constants";
import { cats} from "./cats/cats";
import { dogs } from "./dogs/dogs";
import { displayCommands } from "./allCommands/allCommands";
import { doesMessageContainWeebAndTag, weeb } from "./weeb/weeb";
import { IFetchClient } from "../services/FetchClient";
import { meteo } from "./meteo/meteo";
// import { addComment } from "../services/reacting/reacting";
import fetch from "node-fetch";
import dbFactory from "../utils/dbFactory";
// import { getData } from "../services";

//originalAdminUsername e username-ul pe care il inregistreaza prima data cand intra intr-o guilda
interface IGuildBackendModel {
  discordGuildID: string,
  guildAdminID: string,
  originalAdminUsername: string | undefined,
  membersIdList: string[]
}

//command handler
//aici o sa fac o functie care primeste ca parametru un argument de tipul Message pe care o sa il analizez
//si o sa folosesc comanda care trebuie pentru asa ceva
// const regex = /^ball\s.+/i;
export async function commandHandler(message: Message, client: IFetchClient): Promise<Message | undefined> {
  const BackendClient = dbFactory.getInstance();  
  
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
  case "addQuote": {
    console.log("add quote cica");
    if (message.reference !== null && message.content !== "") {
      // const channel = message.channel.messages.fetch()
      console.log("aici intru daca am reply @user");
      const msgId = message.reference.messageID;
      message.channel.messages.fetch(msgId!)
        .then(res => {
          console.log("msg search", res.content, res.author.username);
          // BackendClient.addQuote({ author: "a", content: "b" });
          BackendClient.addQuote({ content: res.content, author: res.author.id });
          // return addComment(client, "http://localhost:3000/goku/comment", { content: res.content, author: res.author.id });
        })
        .then(res => {
          console.log(res);
        })
        .catch(er => {
          console.log(er);
        });
    }

    return;
    // break;
  }
  case "quote": {
    BackendClient.getRandomQuote();
    // const response = await getData(client, "http://localhost:3000/goku/comment/random");

    // return await message.channel.send(response.message);
    break;
  }
  case "update": {
    if (message.author.id !== MY_CHANNEL_IDS.USER_ID) {
      return await message.reply(REPLY_MESSAGES.NO_AUTHORITY);
    }
    // console.log(message);
    const guildId = message.guild?.id;

    message.client.guilds.fetch(guildId!)
      .then((guild) => {
        // console.log("res", res);
        // const membersList = res.members.fetch();
        return guild.members.fetch();
      })
      .then((members) => {
        // console.log(members);
        const usersData = members.map((member: GuildMember) => {
          return {
            discordServerId: guildId,
            discordUserId: member.user.id,
            discordUsername: member.user.username
          };
        });
        // const res = await fetch("http://localhost:3000/guilds", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Sender": "yosoybot"
        //   },
        //   body: JSON.stringify(guilds)
        // });
        return fetch("http://localhost:3000/goku/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Sender": "yosoybot"
          },
          body: JSON.stringify(usersData)
        });
      })
      .then(async (res) => {
        // console.log(await res.json());
        await message.reply(REPLY_MESSAGES.USERS_ADDED);
      })
      .catch(async (err) => {
        console.log("err", err);
        await message.reply("Ceva rau s-o intamplat");
      });

    // const _undeSuntFolosit = message.client.guilds.cache.map(el => el.id);
    
    // const guilds: IGuildBackendModel[] = [];
    // new Promise((resolve, reject) => {
    //   _undeSuntFolosit.map(id => {
    //     message.client.guilds.fetch(id)
    //       .then(async guild => {
    //         const membersList = await guild.members.fetch();

    //         return {
    //           guild,
    //           membersList
    //         };
    //       })
    //       .then(({ guild, membersList}) => {
    //         const membersIds: string[] = membersList.map((el: any) => el.id);
    //         guilds.push({
    //           discordGuildID: guild.id,
    //           guildAdminID: guild.ownerID,
    //           originalAdminUsername: guild.owner?.user.username,
    //           membersIdList: membersIds
    //         });

    //         resolve(undefined);
    //       })
    //       .catch(er => {
    //         console.log(er);
    //       });
          
    //   });
    // }).then(async () => {
    //   const res = await fetch("http://localhost:3000/guilds", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Sender": "yosoybot"
    //     },
    //     body: JSON.stringify(guilds)
    //   });
    //   console.log(await res.json());
    // });

    break;
  }
  default:
    return await message.reply(REPLY_MESSAGES.UNKNOWN_COMMAND);
  }
}