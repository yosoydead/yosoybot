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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionHandler = void 0;
const rublerts_1 = require("./rubl/rublerts");
const reacting_1 = require("../services/reacting/reacting");
// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// nu cred/nu stiu daca are acces la mesajele din istoric
function reactionHandler(reaction, user, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const emojiName = reaction.emoji.name;
        // const username = user.username;
        //cine o scris aia -> ID
        const author = reaction.message.author.id;
        //canal pe care trebuie sa dea reply
        const channel = reaction.message.channel;
        switch (emojiName) {
            case "rubl" /* RUBLERT */: {
                const message = yield rublerts_1.rublertReaction();
                // console.log(message, username);
                console.log(reaction);
                break;
            }
            case "stitch" /* STITCH */: {
                const msgContent = reaction.message.content;
                // const author = reaction.message.author.id;
                // const channel = reaction.message.channel;
                // const res = await addComment(client, "http://localhost:3000/test/comment", { content: msgContent, author: author });
                const res = yield reacting_1.addMoney(client, "http://localhost:3000/test/user/reward", { author: author, howMuch: 50 });
                yield channel.send(res.message);
                break;
            }
            default:
                console.log("am vazut ca ai reactionat la un emoji necunoscut");
                break;
        }
    });
}
exports.reactionHandler = reactionHandler;
