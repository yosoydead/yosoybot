"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createEmbedFields(entriesObject) {
    var commands = Object.keys(entriesObject);
    var commandsWithDescription = [];
    for (var i = 0; i < commands.length; i++) {
        var entry = {
            name: commands[i],
            value: entriesObject[commands[i]],
            inline: false
        };
        commandsWithDescription.push(entry);
    }
    return commandsWithDescription;
}
exports.createEmbedFields = createEmbedFields;
