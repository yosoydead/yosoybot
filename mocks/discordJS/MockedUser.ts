import Discord, { Client, User } from "discord.js";

export default class MockedUser extends User {
  constructor(client: Client, nickname: string, isBot: boolean) {
    super(client, {
      id: Discord.SnowflakeUtil.generate(),
      username: nickname,
      bot: isBot,
      discriminator: "123456789"
    });
  }
}