import { sendLogs, whatHappened, colorSelect } from "../../src/utils/logJoinOrLeaveServer";
import { SERVER_ACTION, MESSAGE_COLORS } from "../../src/constants";
import Discord, { Guild } from "discord.js";

describe("Testing logJoinOrLeaveServer", () => {
  describe("colorSelect()", () => {
    it("returns a red color if the bot was kicked from a server or left a server", () => {
      const result = colorSelect(SERVER_ACTION.KICK);
      
      expect(result).toEqual(MESSAGE_COLORS.CHANNEL_LEFT);
    });

    it("returns a blue color if the bot joins a server", () => {
      const result = colorSelect(SERVER_ACTION.JOIN);

      expect(result).toEqual(MESSAGE_COLORS.CHANNEL_JOIN);
    });
  });

  describe("whatHappened()", () => {
    it("returns a message saying the bot was kicked", () => {
      const result = whatHappened("yosoydead", SERVER_ACTION.KICK);
      expect(result).toBeDefined();
      expect(result).toEqual({
        "Numele serverului de pe care am fost dat afara: ": "yosoydead"
      });
    });

    it("returns a message if the bot joined a server", () => {
      const result = whatHappened("yosoydead", SERVER_ACTION.JOIN);
      expect(result).toBeDefined();
      expect(result).toEqual({
        "Numele serverului pe care am intrate: ": "yosoydead"
      });
    });

    it("returns an object with a placeholder guildName if param is empty", () => {
      const result = whatHappened("", SERVER_ACTION.JOIN);
      expect(result).toBeDefined();
      expect(result).toEqual({
        "Numele serverului pe care am intrate: ": "<unknown server name>"
      });
    });
  });

  describe("sendLogs()", () => {
    // making a dummy type for the Discord Guild type
    /* LINKS 
      * https://stackoverflow.com/questions/60916450/jest-testing-discord-bot-commands
      * https://www.reddit.com/r/discordapp/comments/6ov372/how_does_the_color_code_for_bot_embeds_work/
      * https://www.w3schools.com/jsref/jsref_parseint.asp
    */
    const client = new Discord.Client();
    // intr-un obiect de guild, culoarea e, de fapt, HEXADECIMAL pentru culoarea pe care o dai tu ca string #123123
    const guild: Guild = new Guild(client, { name: "yosoydead" });
    const result = sendLogs(guild, SERVER_ACTION.JOIN);
    
    const hex = (parseInt(MESSAGE_COLORS.CHANNEL_JOIN.substring(1), 16));
    
    expect(result.color).toEqual(hex);
    expect(result.title).toContain("o intrat");
    expect(result.description).not.toContain("dat afara");
  });
});