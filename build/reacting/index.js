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
exports.reactionHandler = exports.determineTransactionReason = exports.msgContentAndAttachment = void 0;
const constants_1 = require("../constants");
const dbFactory_1 = __importDefault(require("../utils/dbFactory"));
const types_1 = require("../types");
const cacheFactory_1 = __importDefault(require("../utils/cacheFactory"));
function msgContentAndAttachment(message) {
    const msgText = message.content;
    const msgAttachment = message.attachments.array();
    return {
        content: msgText,
        attachments: msgAttachment,
        authorUsername: message.author.username
    };
}
exports.msgContentAndAttachment = msgContentAndAttachment;
function determineTransactionReason(msgContents) {
    let reason;
    if (msgContents.content === "" && msgContents.attachments.length > 0) {
        reason = `Ai dat react lui ${msgContents.authorUsername}. Am stocat doar un link de imagine pt dovada: ${msgContents.attachments[0].url}`;
    }
    else if (msgContents.content !== "" && msgContents.attachments.length === 0) {
        reason = `Ai dat react lui ${msgContents.authorUsername}. Mesajul a fost: ${msgContents.content}`;
    }
    else if (msgContents.content !== "" && msgContents.attachments.length > 0) {
        reason = `Ai dat react lui ${msgContents.authorUsername}. Text: ${msgContents.content}. Poza: ${msgContents.attachments[0].url}`;
    }
    else {
        reason = "Cred ca ceva s-o dus in cacat si nu am salvat ce trebuie?";
    }
    return reason;
}
exports.determineTransactionReason = determineTransactionReason;
// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// nu cred/nu stiu daca are acces la mesajele din istoric
function reactionHandler(reaction, user, client) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(reaction.emoji.name, user);
        const BackendClient = dbFactory_1.default.getInstance();
        // nu da mesaj pe prod cand esti pe local
        if (BackendClient.getAppMode() === types_1.APP_MODES.LOCAL && ((_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.id) === constants_1.GUILD_IDS.GOKU_SERVER)
            return;
        // nu da mesaj pe local cand esti pe prod
        if (BackendClient.getAppMode() === types_1.APP_MODES.PROD && ((_b = reaction.message.guild) === null || _b === void 0 ? void 0 : _b.id) === constants_1.GUILD_IDS.YOSOYDEAD_SERVER)
            return;
        const emojiName = reaction.emoji.name;
        const messageID = reaction.message.id;
        switch (emojiName) {
            case "rubl" /* RUBLERT */: {
                reaction.message.channel.messages.fetch(messageID)
                    .then((foundMessage) => {
                    if (foundMessage.author.id === constants_1.USER_IDS.YOSOYBOT)
                        return Promise.resolve("Nu o sa iau in considerare tranzactiile pe numele botului.");
                    const contents = msgContentAndAttachment(foundMessage);
                    const reason = determineTransactionReason(contents);
                    cacheFactory_1.default.getInstance().updateTransactionStore({
                        cost: -1,
                        discordUserId: user.id,
                        reason: reason
                    });
                    return Promise.resolve("Trimis tranzactia in cache");
                })
                    .then((backendResult) => {
                    console.log(backendResult);
                })
                    .catch(err => {
                    console.log("mesaj cautat eroare", err);
                });
                break;
            }
            case "stitch" /* STITCH */: {
                reaction.message.channel.messages.fetch(messageID)
                    .then((foundMessage) => {
                    if (foundMessage.author.id === constants_1.USER_IDS.YOSOYBOT)
                        return Promise.resolve("Nu o sa iau in considerare tranzactiile pe numele botului.");
                    const contents = msgContentAndAttachment(foundMessage);
                    const reason = determineTransactionReason(contents);
                    return BackendClient.addTransactions([
                        {
                            cost: 10,
                            discordUserId: "405081094057099276",
                            reason: reason
                        },
                        {
                            cost: -10,
                            discordUserId: "405081094057099276",
                            reason: reason
                        },
                        {
                            cost: 20,
                            discordUserId: "405081094057099276",
                            reason: reason
                        },
                        {
                            cost: -100,
                            discordUserId: "405081094057099276",
                            reason: reason
                        },
                    ]);
                })
                    .then((backendResult) => {
                    console.log(backendResult);
                })
                    .catch(err => {
                    console.log("mesaj cautat eroare", err);
                });
                break;
            }
            default:
                console.log("am vazut ca ai reactionat la un emoji necunoscut");
                break;
        }
    });
}
exports.reactionHandler = reactionHandler;
