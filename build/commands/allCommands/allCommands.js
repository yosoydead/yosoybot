"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayCommands = void 0;
const CommandNames_1 = require("../CommandNames");
const createEmbedFields_1 = require("../../utils/createEmbedFields");
const createMessageEmbed_1 = require("../../utils/createMessageEmbed");
const constants_1 = require("../../constants");
function displayCommands() {
    const embedFields = createEmbedFields_1.createEmbedFields(CommandNames_1.CommandsObject);
    const message = createMessageEmbed_1.createMessageEmbed(constants_1.MESSAGE_COLORS.DEFAULT, constants_1.REPLY_MESSAGES.COMMANDS_TITLE, constants_1.REPLY_MESSAGES.COMMANDS_DESCRIPTION, embedFields, "Yosoydead", constants_1.REPLY_MESSAGES.COMMANDS_FOOTER);
    return message;
}
exports.displayCommands = displayCommands;
