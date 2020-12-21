import Discord, { TextChannel, Guild } from "discord.js";

export default class MockedTextChannel extends TextChannel {
  constructor(guild: Guild) {
    super(guild, {
      id: Discord.SnowflakeUtil.generate(),
      type: 0
    });
    this.client.channels.cache.set(this.id, this);
  }
}