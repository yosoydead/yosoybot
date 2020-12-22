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
//command handler
//aici o sa fac o functie care primeste ca parametru un argument de tipul Message pe care o sa il analizez
//si o sa folosesc comanda care trebuie pentru asa ceva
// const regex = /^ball\s.+/i;
function commandHandler(message, client) {
    return __awaiter(this, void 0, void 0, function* () {
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
            default:
                return yield message.reply(constants_1.REPLY_MESSAGES.UNKNOWN_COMMAND);
        }
    });
}
exports.commandHandler = commandHandler;
