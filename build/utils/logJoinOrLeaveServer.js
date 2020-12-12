"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendLogs = exports.whatHappened = exports.colorSelect = void 0;
var constants_1 = require("../constants");
var createEmbedFields_1 = require("./createEmbedFields");
var createMessageEmbed_1 = require("./createMessageEmbed");
var colorSelect = function (action) {
    return action === constants_1.SERVER_ACTION.JOIN ? constants_1.MESSAGE_COLORS.CHANNEL_JOIN : constants_1.MESSAGE_COLORS.CHANNEL_LEFT;
};
exports.colorSelect = colorSelect;
var whatHappened = function (guildName, action) {
    var join = {
        "Numele serverului pe care am intrate: ": guildName
    };
    var left = {
        "Numele serverului de pe care am fost dat afara": guildName
    };
    return action === constants_1.SERVER_ACTION.JOIN ? join : left;
};
exports.whatHappened = whatHappened;
function SendLogs(guild, action) {
    var color = exports.colorSelect(action);
    var event = exports.whatHappened(guild.name, action);
    var fields = createEmbedFields_1.createEmbedFields(event);
    var message = createMessageEmbed_1.createMessageEmbed(color, action === constants_1.SERVER_ACTION.JOIN ? "Yosoybot o intrat pe un server" : "Yosoybot o fost dat afara de pe un server", action === constants_1.SERVER_ACTION.JOIN ? "Boss, am intrat pe un server" : "Boss, vezi ca am fost dat afara de pe un server", fields, "Yosoybot", "Ne miscam");
    return message;
}
exports.SendLogs = SendLogs;
