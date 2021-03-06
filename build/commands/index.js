"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandHandler = void 0;
const eightBall_1 = __importDefault(require("./eightBall/eightBall"));
const ping_1 = require("./ping/ping");
const constants_1 = require("../constants");
const cats_1 = require("./cats/cats");
const dogs_1 = require("./dogs/dogs");
const allCommands_1 = require("./allCommands/allCommands");
const weeb_1 = require("./weeb/weeb");
const meteo_1 = require("./meteo/meteo");
// import { addComment } from "../services/reacting/reacting";
const node_fetch_1 = __importDefault(require("node-fetch"));
const dbFactory_1 = __importDefault(require("../utils/dbFactory"));
//command handler
//aici o sa fac o functie care primeste ca parametru un argument de tipul Message pe care o sa il analizez
//si o sa folosesc comanda care trebuie pentru asa ceva
// const regex = /^ball\s.+/i;
function commandHandler(message, client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const BackendClient = dbFactory_1.default.getInstance();
        // apare scenariul in care botul o sa isi raspunda la propriile mesaje, adica face o bucla infinita
        // ii dau short circuit direct cand vad ca mesajul e de la bot
        if (message.author.username === "yosoybot")
            return;
        //sparg mesajul in bucati si vreau sa vad care e primul cuvant din mesaj
        const splitMessage = message.content.split(" ");
        // verific daca mesajul contine un @user si weeb inainte sa procesez comenzile
        // am pus spatiu acolo pentru ca vreau sa fie @user \n <ascii>
        const containsWeebAndTag = weeb_1.doesMessageContainWeebAndTag(splitMessage);
        if (containsWeebAndTag.weeb && containsWeebAndTag.tagging)
            return yield message.channel.send(`${containsWeebAndTag.tag} 
  ${weeb_1.weeb()}`);
        //daca mesajul nu incepe cu !, o sa ignor comanda
        if (splitMessage[0].charAt(0) !== "%")
            return;
        // console.log("mesaj",message);
        // trec prin fiecare tip de comanda si ii dau sa faca ceva
        switch (splitMessage[0].substring(1)) {
            case "8ball" /* EIGHT_BALL */:
                if (splitMessage.length === 1)
                    return yield message.reply(constants_1.REPLY_MESSAGES.EMPTY_EIGHT_BALL);
                return yield message.reply(eightBall_1.default());
            case "ping" /* PING */:
                return yield message.reply(ping_1.pong());
            case "pong" /* PONG */:
                return yield message.reply(ping_1.ping());
            case "cats" /* CATS_FACT */: {
                const catFact = yield cats_1.cats(client);
                return yield message.reply(catFact);
            }
            case "dogs" /* DOGS_FACT */: {
                const dogFacts = yield dogs_1.dogs(client);
                return yield message.reply(dogFacts);
            }
            case "commands" /* COMMANDS */:
                return yield message.reply(allCommands_1.displayCommands());
            case "meteo" /* METEO */:
            case "weather" /* WEATHER */: {
                if (splitMessage.length === 1)
                    return yield message.reply("Comanda accepta 2 parametri: **obligatoriu** - *numele orasului* si **optional** - *codul tarii*. Daca nu pui codul tarii, o sa returneze primul oras pe care il gaseste chiar daca sunt mai multe cu acelasi nume in lume. Exemplu: %meteo **hell** **--no**. Pentru codul unei tari poti folosi: https://www.iban.com/country-codes");
                const messageLength = splitMessage.length - 1;
                // daca ultimul element din arrayul de mesaj contine --<codul unei tari>, caut meteo despre orasul in tara respectiva
                if (splitMessage[messageLength].includes("--")) {
                    const _countryCode = splitMessage[messageLength].substring(2);
                    const _city = splitMessage.slice(1, messageLength).join(" ");
                    const weather = yield meteo_1.meteo(client, process.env.OPEN_WEATHER_API, _city, _countryCode);
                    return yield message.reply(weather);
                }
                //0: comanda meteo
                //1: oras - exista orase cu spatiu in nume (ex: New York, Drobeta-Turnu Severin, Piatra Neamt, etc)
                const city = splitMessage.slice(1).join(" ");
                const result = yield meteo_1.meteo(client, process.env.OPEN_WEATHER_API, city);
                return yield message.reply(result);
            }
            case "addQuote" /* ADD_QUOTE */: {
                if (message.reference !== null && message.content !== "") {
                    const msgId = message.reference.messageID;
                    message.channel.messages.fetch(msgId)
                        .then(res => {
                        return BackendClient.addQuote({ content: res.content, author: res.author.id });
                    })
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        return yield message.channel.send(res);
                    }))
                        .catch((er) => __awaiter(this, void 0, void 0, function* () {
                        return yield message.channel.send(constants_1.REPLY_MESSAGES.MESSAGE_NOT_FOUND);
                    }));
                }
                return;
            }
            case "quote" /* RANDOM_QUOTE */: {
                const response = yield BackendClient.getRandomQuote();
                return yield message.channel.send(response);
            }
            case "update": {
                if (message.author.id !== constants_1.MY_CHANNEL_IDS.USER_ID) {
                    return yield message.reply(constants_1.REPLY_MESSAGES.NO_AUTHORITY);
                }
                // console.log(message);
                const guildId = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id;
                message.client.guilds.fetch(guildId)
                    .then((guild) => {
                    // console.log("res", res);
                    // const membersList = res.members.fetch();
                    return guild.members.fetch();
                })
                    .then((members) => {
                    // console.log(members);
                    const usersData = members.map((member) => {
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
                    return node_fetch_1.default("http://localhost:3000/goku/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Sender": constants_1.BOT_NAME
                        },
                        body: JSON.stringify(usersData)
                    });
                })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    // console.log(await res.json());
                    yield message.reply(constants_1.REPLY_MESSAGES.USERS_ADDED);
                }))
                    .catch((err) => __awaiter(this, void 0, void 0, function* () {
                    console.log("err", err);
                    yield message.reply("Ceva rau s-o intamplat");
                }));
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
                return yield message.reply(constants_1.REPLY_MESSAGES.UNKNOWN_COMMAND);
        }
    });
}
exports.commandHandler = commandHandler;
