"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayCommands = void 0;
var CommandNames_1 = require("../CommandNames");
var createEmbedFields_1 = require("../../utils/createEmbedFields");
var createMessageEmbed_1 = require("../../utils/createMessageEmbed");
var constants_1 = require("../../constants");
function displayCommands() {
    var embedFields = createEmbedFields_1.createEmbedFields(CommandNames_1.CommandsObject);
    var message = createMessageEmbed_1.createMessageEmbed(constants_1.MESSAGE_COLORS.DEFAULT, constants_1.REPLY_MESSAGES.COMMANDS_TITLE, constants_1.REPLY_MESSAGES.COMMANDS_DESCRIPTION, embedFields, "Yosoydead", constants_1.REPLY_MESSAGES.COMMANDS_FOOTER);
    return message;
}
exports.displayCommands = displayCommands;
