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
exports.reactionHandler = exports.msgContentAndAttachment = void 0;
const constants_1 = require("../constants");
const rublerts_1 = require("./rubl/rublerts");
const dbFactory_1 = __importDefault(require("../utils/dbFactory"));
const types_1 = require("../types");
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
// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// nu cred/nu stiu daca are acces la mesajele din istoric
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
                const message = yield rublerts_1.rublertReaction();
                // console.log(message, username);
                console.log(reaction);
                break;
            }
            case "stitch" /* STITCH */: {
                console.log("stitch");
                reaction.message.channel.messages.fetch(messageID)
                    .then((foundMessage) => {
                    if (foundMessage.author.id === constants_1.USER_IDS.YOSOYBOT)
                        return Promise.resolve("Nu o sa iau in considerare tranzactiile pe numele botului.");
                    const contents = msgContentAndAttachment(foundMessage);
                    let reason;
                    if (contents.content === "" && contents.attachments.length > 0) {
                        reason = `Ai dat react lui ${contents.authorUsername}. Am stocat doar un link de imagine pt dovada: ${contents.attachments[0].url}`;
                    }
                    else if (contents.content !== "" && contents.attachments.length === 0) {
                        reason = `Ai dat react lui ${contents.authorUsername}. Mesajul a fost: ${contents.content}`;
                    }
                    else if (contents.content !== "" && contents.attachments.length > 0) {
                        reason = `Ai dat react lui ${contents.authorUsername}. Text: ${contents.content}. Poza: ${contents.attachments[0].url}`;
                    }
                    else {
                        reason = "Cred ca ceva s-o dus in cacat si nu am salvat ce trebuie?";
                    }
                    return BackendClient.addTransactions([
                        {
                            cost: 10,
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
