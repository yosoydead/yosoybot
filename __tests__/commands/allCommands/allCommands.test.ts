import { displayCommands } from "../../../src/commands/allCommands/allCommands";
import { CommandsObject } from "../../../src/commands/CommandNames";
import { REPLY_MESSAGES } from "../../../src/constants";

describe("allCommands()", () => {
  it("should return MessageEmbed object containing the list of available commands", () => {
    const result = displayCommands();

    expect(result.fields.length).toEqual(Object.keys(CommandsObject).length);
    expect(result.title).toEqual(REPLY_MESSAGES.COMMANDS_TITLE);
  });
});