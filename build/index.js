"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// client id: 784135061225734184
// https://discord.com/developers/applications/784135061225734184/bot
// https://discord.com/oauth2/authorize?client_id=<client id>&scope=bot accesezi asta ca sa dai invite la bot
// https://discord.com/oauth2/authorize?client_id=784135061225734184&scope=bot
const discord_js_1 = __importDefault(require("discord.js"));
const dotenv = __importStar(require("dotenv"));
const commands_1 = require("./commands");
const constants_1 = require("./constants");
const logJoinOrLeaveServer_1 = require("./utils/logJoinOrLeaveServer");
const reacting_1 = require("./reacting");
const FetchClient_1 = require("./services/FetchClient");
const CacheClient_1 = __importDefault(require("./CacheClient"));
const dbFactory_1 = __importDefault(require("./utils/dbFactory"));
dotenv.config();
const client = new discord_js_1.default.Client({
    partials: ["MESSAGE", "REACTION"]
});
const fetchClient = new FetchClient_1.FetchClient();
const cache = new CacheClient_1.default();
client.once("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("my body is ready");
    // const channelEntry = await client.channels.fetch(MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
    // console.log(channelEntry);
    // console.log(client.guilds);
    // console.log("---------------------------------------------------");
    //aparent, channels.fetch iti returneaza un obiect de tipul Channel
    //id ala e de pe serverul meu adica canalul general care e de tip TextChannel care are o functie de send
    //cauta in documentatie
    // client.channels.fetch("781108831421333538")
    //   .then((channel) => {
    //     // console.log(channel);
    //     // channel.send("i live, dickheads");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
}));
client.on("guildCreate", (guild) => __awaiter(void 0, void 0, void 0, function* () {
    const myChannel = yield client.guilds.fetch(constants_1.MY_CHANNEL_IDS.YOSOYDEAD_SERVER);
    const channelEntry = myChannel.channels.cache.get(constants_1.MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
    const message = logJoinOrLeaveServer_1.sendLogs(guild, constants_1.SERVER_ACTION.JOIN);
    channelEntry.send(message);
}));
client.on("guildDelete", (guild) => __awaiter(void 0, void 0, void 0, function* () {
    const myChannel = yield client.guilds.fetch(constants_1.MY_CHANNEL_IDS.YOSOYDEAD_SERVER);
    const channelEntry = myChannel.channels.cache.get(constants_1.MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
    const message = logJoinOrLeaveServer_1.sendLogs(guild, constants_1.SERVER_ACTION.KICK);
    channelEntry.send(message);
}));
client.on("message", (message) => commands_1.commandHandler(message, fetchClient));
client.on("messageDelete", (message) => {
    console.log("am sters:", message.content);
});
client.on("messageReactionAdd", (reaction, user) => reacting_1.reactionHandler(reaction, user, fetchClient));
client.on("messageReactionRemove", (reaction, user) => reacting_1.reactionHandler(reaction, user, fetchClient));
// // cron function
function cron(ms, fn) {
    function cb() {
        clearTimeout(timeout);
        timeout = setTimeout(cb, ms);
        fn();
    }
    let timeout = setTimeout(cb, ms);
    return () => { };
}
// setup cron job 1500000
cron(1500000, () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(client.channels);
    const wakeupChannel = yield client.channels.fetch(constants_1.MY_CHANNEL_IDS.WAKEUP_CRONJOB);
    // console.log(wakeupChannel);
    wakeupChannel.send("Mesaj ca sa nu se duca botul la somn");
}));
client.login(process.env.BOT_TOKEN)
    .then(() => {
    var _a;
    console.log("login");
    dbFactory_1.default.createInstance(process.env.NODE_ENV, fetchClient);
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity("%commands");
})
    .catch(err => {
    console.log(err);
});
