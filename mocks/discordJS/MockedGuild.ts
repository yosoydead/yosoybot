import Discord, { Guild, Client } from "discord.js";

export default class MockedGuild extends Guild {
  constructor(client: Client) {
    super(client, {
      // you don't need all of these but I just put them in to show you all the properties that Discord.js uses
      id: Discord.SnowflakeUtil.generate(),
      name: "Yosoytesting",
      icon: null,
      splash: null,
      owner_id: "",
      region: "narnia",
      afk_channel_id: null,
      afk_timeout: 0,
      verification_level: 0,
      default_message_notifications: 0,
      explicit_content_filter: 0,
      roles: [],
      emojis: [],
      features: [],
      mfa_level: 0,
      application_id: null,
      system_channel_id: null
    });
    this.client.guilds.cache.set(this.id, this);
  }
}