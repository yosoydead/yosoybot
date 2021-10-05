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
        reason = `Am stocat doar un link de imagine pt dovada: ${msgContents.attachments[0].url}.`;
    }
    else if (msgContents.content !== "" && msgContents.attachments.length === 0) {
        reason = `Mesajul a fost: ${msgContents.content}.`;
    }
    else if (msgContents.content !== "" && msgContents.attachments.length > 0) {
        reason = `Text: ${msgContents.content}. Poza: ${msgContents.attachments[0].url}.`;
    }
    else {
        reason = `Ceva necunoscut. Probabil un sticker sau ceva atasament dubios.`;
    }
    return reason;
}
exports.determineTransactionReason = determineTransactionReason;
// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// ----(nu cred/nu stiu daca are acces la mesajele din istoric)---- nu mai e valabil
// practic, ce se intampla e ca poti sa faci rost de id-ul mesajului la care se da react
// apoi, il cauti in istoric si vezi continutul. downside: probabil dureaza mult sau poate da fail
function reactionHandler(reaction, user, client) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
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
                    if (foundMessage.author.id === user.id)
                        return Promise.resolve("Cum ar fi sa iti dai singur bani :kekw:");
                    const contents = msgContentAndAttachment(foundMessage);
                    const reason = determineTransactionReason(contents);
                    const transactionsSet = [
                        {
                            reason: `Ai dat react. ${reason}`,
                            discordUserId: user.id,
                            cost: -1,
                            status: "pending",
                            type: "give",
                            receiverDiscordUserId: foundMessage.author.id,
                            receiverDiscordUsername: foundMessage.author.username
                        },
                        {
                            cost: 1,
                            discordUserId: foundMessage.author.id,
                            status: "pending",
                            reason: `Ai primit 1 ban. ${reason}`,
                            type: "receive",
                            initiatorDiscordUserId: user.id,
                            initiatorDiscordUsername: user.username
                        }
                    ];
                    cacheFactory_1.default.getInstance().updateTransactionStore(transactionsSet);
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
                    const transactionsSet = [
                        {
                            reason: `Ai dat react lui ${reason}`,
                            discordUserId: user.id,
                            cost: -1,
                            status: "pending",
                            type: "give",
                            receiverDiscordUserId: foundMessage.author.id,
                            receiverDiscordUsername: foundMessage.author.username
                        },
                        {
                            cost: 1,
                            discordUserId: foundMessage.author.id,
                            status: "pending",
                            reason: `Ai primit 1 ban din partea lui ${reason}`,
                            type: "receive",
                            initiatorDiscordUserId: user.id,
                            initiatorDiscordUsername: user.username
                        }
                    ];
                    cacheFactory_1.default.getInstance().updateTransactionStore(transactionsSet);
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
            default:
                console.log("am vazut ca ai reactionat la un emoji necunoscut", reaction.emoji.name);
                break;
        }
    });
}
exports.reactionHandler = reactionHandler;
