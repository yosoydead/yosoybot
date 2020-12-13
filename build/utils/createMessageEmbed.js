"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageEmbed = void 0;
var discord_js_1 = __importDefault(require("discord.js"));
function createMessageEmbed(hexColor, title, description, fields, author, footer) {
    // ar trebui sa iau in considerare ca poate o sa uit sa pun vreo valoare la unul din parametri
    var _t = title === "" ? "<unknown title>" : title;
    var _d = description === "" ? "<unknown description>" : description;
    var _a = author === "" ? "<unknown author>" : author;
    var _f = footer === "" ? "<unknown footer>" : footer;
    var message = new discord_js_1.default.MessageEmbed()
        .setColor(hexColor)
        .setTitle(_t)
        .setDescription(_d)
        .addFields(fields)
        .setAuthor(_a)
        .setFooter(_f)
        .setTimestamp();
    return message;
}
exports.createMessageEmbed = createMessageEmbed;
