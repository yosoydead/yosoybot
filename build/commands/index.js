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
exports.commandHandler = void 0;
var eightBall_1 = __importDefault(require("./eightBall/eightBall"));
var ping_1 = require("./ping/ping");
var constants_1 = require("../constants");
var cats_1 = require("./cats/cats");
var allCommands_1 = require("./allCommands/allCommands");
//command handler
//aici o sa fac o functie care primeste ca parametru un argument de tipul Message pe care o sa il analizez
//si o sa folosesc comanda care trebuie pentru asa ceva
// const regex = /^ball\s.+/i;
function commandHandler(message) {
    return __awaiter(this, void 0, void 0, function () {
        var splitMessage, _a, catFact;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // apare scenariul in care botul o sa isi raspunda la propriile mesaje, adica face o bucla infinita
                    // ii dau short circuit direct cand vad ca mesajul e de la bot
                    if (message.author.username === "yosoybot")
                        return [2 /*return*/];
                    splitMessage = message.content.split(" ");
                    //daca mesajul nu incepe cu !, o sa ignor comanda
                    if (splitMessage[0].charAt(0) !== "!")
                        return [2 /*return*/];
                    _a = splitMessage[0].substring(1);
                    switch (_a) {
                        case "8ball" /* EIGHT_BALL */: return [3 /*break*/, 1];
                        case "ping" /* PING */: return [3 /*break*/, 5];
                        case "pong" /* PONG */: return [3 /*break*/, 7];
                        case "cats" /* CATS_FACT */: return [3 /*break*/, 9];
                        case "commands" /* COMMANDS */: return [3 /*break*/, 14];
                    }
                    return [3 /*break*/, 16];
                case 1:
                    if (!(splitMessage.length === 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, message.reply(constants_1.REPLY_MESSAGES.EMPTY_EIGHT_BALL)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, message.reply(eightBall_1.default())];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, message.reply(ping_1.pong())];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, message.reply(ping_1.ping())];
                case 8: return [2 /*return*/, _b.sent()];
                case 9: return [4 /*yield*/, cats_1.cats()];
                case 10:
                    catFact = _b.sent();
                    if (!(catFact === "")) return [3 /*break*/, 12];
                    return [4 /*yield*/, message.reply(constants_1.REPLY_MESSAGES.EMPTY_CATS_FACT)];
                case 11: return [2 /*return*/, _b.sent()];
                case 12: return [4 /*yield*/, message.reply(catFact)];
                case 13: return [2 /*return*/, _b.sent()];
                case 14: return [4 /*yield*/, message.reply(allCommands_1.displayCommands())];
                case 15: return [2 /*return*/, _b.sent()];
                case 16: return [4 /*yield*/, message.reply(constants_1.REPLY_MESSAGES.UNKNOWN_COMMAND)];
                case 17: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.commandHandler = commandHandler;
