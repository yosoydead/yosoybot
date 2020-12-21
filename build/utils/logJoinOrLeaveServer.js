"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLogs = exports.whatHappened = exports.colorSelect = void 0;
const constants_1 = require("../constants");
const createEmbedFields_1 = require("./createEmbedFields");
const createMessageEmbed_1 = require("./createMessageEmbed");
const colorSelect = (action) => {
    return action === constants_1.SERVER_ACTION.JOIN ? constants_1.MESSAGE_COLORS.CHANNEL_JOIN : constants_1.MESSAGE_COLORS.CHANNEL_LEFT;
};
exports.colorSelect = colorSelect;
const whatHappened = (guildName, action) => {
    const name = guildName === "" ? "<unknown server name>" : guildName;
    const join = {
        "Numele serverului pe care am intrate: ": name
    };
    const left = {
        "Numele serverului de pe care am fost dat afara: ": name
    };
    return action === constants_1.SERVER_ACTION.JOIN ? join : left;
};
exports.whatHappened = whatHappened;
function sendLogs(guild, action) {
    const color = exports.colorSelect(action);
    const event = exports.whatHappened(guild.name, action);
    const fields = createEmbedFields_1.createEmbedFields(event);
    const message = createMessageEmbed_1.createMessageEmbed(color, action === constants_1.SERVER_ACTION.JOIN ? "Yosoybot o intrat pe un server" : "Yosoybot o fost dat afara de pe un server", action === constants_1.SERVER_ACTION.JOIN ? "Boss, am intrat pe un server" : "Boss, vezi ca am fost dat afara de pe un server", fields, "Yosoybot", "Ne miscam");
    return message;
}
exports.sendLogs = sendLogs;
