"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageEmbed = void 0;
var discord_js_1 = __importDefault(require("discord.js"));
function createMessageEmbed(hexColor, title, description, fields, author, footer) {
    var message = new discord_js_1.default.MessageEmbed()
        .setColor(hexColor)
        .setTitle(title)
        .setDescription(description)
        .addFields(fields)
        .setAuthor(author)
        .setFooter(footer)
        .setTimestamp();
    return message;
}
exports.createMessageEmbed = createMessageEmbed;
