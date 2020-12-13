"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANIMAL_FACTS_APIS = exports.SERVER_ACTION = exports.MESSAGE_COLORS = exports.MY_CHANNEL_IDS = exports.REPLY_MESSAGES = void 0;
exports.REPLY_MESSAGES = {
    ALO: "Aaalo",
    CHANNEL_ENTRY_LOG: "Canal pe care am intrat",
    COMMANDS_DESCRIPTION: "Here is a list of all my current commands:",
    COMMANDS_FOOTER: "Much love. @yosoydead#9299 for other questions.",
    COMMANDS_TITLE: "Hi. I am yosoybot!",
    EMPTY_EIGHT_BALL: "Nu fi nesi si adauga o intrebare ;)",
    EMPTY_ANIMAL_FACT: "The request failed. Check if the API is still available. :)",
    PONG: "PONG",
    SERVER_ENTERED: "Salut",
    SERVER_KICKED: "Am fost dat afara",
    UNKNOWN_COMMAND: "Nu stiu comanda :(",
};
exports.MY_CHANNEL_IDS = {
    INTRAT_PE_SERVERE: "785131037139140641",
    GENERAL: "781108831421333538",
    LOG_ERORI: "785130953525559307",
    YOSOYDEAD_SERVER: "781108831421333535",
    WAKEUP_CRONJOB: "785846537543876639"
};
//colorez MessageEmbed
var MESSAGE_COLORS;
(function (MESSAGE_COLORS) {
    MESSAGE_COLORS["DEFAULT"] = "#3f51b5";
    MESSAGE_COLORS["CHANNEL_LEFT"] = "#dd2c00";
    MESSAGE_COLORS["CHANNEL_JOIN"] = "#00c853";
})(MESSAGE_COLORS = exports.MESSAGE_COLORS || (exports.MESSAGE_COLORS = {}));
;
// folosita pentru guildAdd/guildRemove
var SERVER_ACTION;
(function (SERVER_ACTION) {
    SERVER_ACTION[SERVER_ACTION["JOIN"] = 0] = "JOIN";
    SERVER_ACTION[SERVER_ACTION["KICK"] = 1] = "KICK";
})(SERVER_ACTION = exports.SERVER_ACTION || (exports.SERVER_ACTION = {}));
var ANIMAL_FACTS_APIS;
(function (ANIMAL_FACTS_APIS) {
    ANIMAL_FACTS_APIS["CATS"] = "https://meowfacts.herokuapp.com/";
    ANIMAL_FACTS_APIS["DOGS"] = "http://dog-api.kinduff.com/api/facts";
})(ANIMAL_FACTS_APIS = exports.ANIMAL_FACTS_APIS || (exports.ANIMAL_FACTS_APIS = {}));
