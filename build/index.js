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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// client id: 784135061225734184
// https://discord.com/developers/applications/784135061225734184/bot
// https://discord.com/oauth2/authorize?client_id=<client id>&scope=bot accesezi asta ca sa dai invite la bot
// https://discord.com/oauth2/authorize?client_id=784135061225734184&scope=bot
var discord_js_1 = __importDefault(require("discord.js"));
var dotenv = __importStar(require("dotenv"));
var commands_1 = require("./commands");
var constants_1 = require("./constants");
var logJoinOrLeaveServer_1 = require("./utils/logJoinOrLeaveServer");
var reacting_1 = require("./reacting");
var FetchClient_1 = require("./services/FetchClient");
dotenv.config();
var client = new discord_js_1.default.Client();
var fetchClient = new FetchClient_1.FetchClient();
client.once("ready", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("my body is ready");
        return [2 /*return*/];
    });
}); });
client.on("guildCreate", function (guild) { return __awaiter(void 0, void 0, void 0, function () {
    var myChannel, channelEntry, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.guilds.fetch(constants_1.MY_CHANNEL_IDS.YOSOYDEAD_SERVER)];
            case 1:
                myChannel = _a.sent();
                channelEntry = myChannel.channels.cache.get(constants_1.MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
                message = logJoinOrLeaveServer_1.sendLogs(guild, constants_1.SERVER_ACTION.JOIN);
                channelEntry.send(message);
                return [2 /*return*/];
        }
    });
}); });
client.on("guildDelete", function (guild) { return __awaiter(void 0, void 0, void 0, function () {
    var myChannel, channelEntry, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.guilds.fetch(constants_1.MY_CHANNEL_IDS.YOSOYDEAD_SERVER)];
            case 1:
                myChannel = _a.sent();
                channelEntry = myChannel.channels.cache.get(constants_1.MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
                message = logJoinOrLeaveServer_1.sendLogs(guild, constants_1.SERVER_ACTION.KICK);
                channelEntry.send(message);
                return [2 /*return*/];
        }
    });
}); });
client.on("message", function (message) { return commands_1.commandHandler(message, fetchClient); });
client.on("messageDelete", function (message) {
    console.log("am sters:", message.content);
});
client.on("messageReactionAdd", reacting_1.reactionHandler);
// // cron function
function cron(ms, fn) {
    function cb() {
        clearTimeout(timeout);
        timeout = setTimeout(cb, ms);
        fn();
    }
    var timeout = setTimeout(cb, ms);
    return function () { };
}
// setup cron job 1500000
cron(1500000, function () { return __awaiter(void 0, void 0, void 0, function () {
    var wakeupChannel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.channels.fetch(constants_1.MY_CHANNEL_IDS.WAKEUP_CRONJOB)];
            case 1:
                wakeupChannel = _a.sent();
                // console.log(wakeupChannel);
                wakeupChannel.send("Mesaj ca sa nu se duca botul la somn");
                return [2 /*return*/];
        }
    });
}); });
client.login(process.env.BOT_TOKEN)
    .then(function () {
    var _a;
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity("%commands");
})
    .catch(function (err) {
    console.log(err);
});
