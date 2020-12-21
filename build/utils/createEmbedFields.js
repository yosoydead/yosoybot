"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbedFields = void 0;
function createEmbedFields(entriesObject) {
    const commands = Object.keys(entriesObject);
    const commandsWithDescription = [];
    if (commands.length === 1 && commands[0] === "")
        return commandsWithDescription;
    for (let i = 0; i < commands.length; i++) {
        if (commands[i] === "" || entriesObject[commands[i]] === "")
            continue;
        const entry = {
            name: commands[i],
            value: entriesObject[commands[i]],
            inline: false
        };
        commandsWithDescription.push(entry);
    }
    return commandsWithDescription;
}
exports.createEmbedFields = createEmbedFields;
