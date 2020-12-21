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
// functia asta o sa se ocupe de inregistrat fiecare react care are loc pentru un mesaj
// ATENTIE! botul o sa ia in considerare doar reacturile din momentul in care intra pe server
// nu cred/nu stiu daca are acces la mesajele din istoric
function reactionHandler(reaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const emojiName = reaction.emoji.name;
        const username = user.username;
        switch (emojiName) {
            case "rubl" /* RUBLERT */: {
                const message = yield rublerts_1.rublertReaction();
                console.log(message, username);
                break;
            }
            case "stitch" /* STITCH */: {
                console.log("am vazut ca ai reactionat cu stitch", username);
                break;
            }
            default:
                console.log("am vazut ca ai reactionat la un emoji necunoscut");
                break;
        }
    });
}
exports.reactionHandler = reactionHandler;
