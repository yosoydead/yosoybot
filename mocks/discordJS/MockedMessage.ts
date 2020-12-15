import Discord, { Message, User} from "discord.js";

export default class MockedMessage extends Message {
  constructor(content: string, channel: any, author: User) {
    super(channel.client, {
      id: Discord.SnowflakeUtil.generate(),
      type: 0,
      channel_id: channel.id,
      content,
      author,
      pinned: false,
      tts: false,
      nonce: "",
      embeds: [],
      attachments: [],
      timestamp: Date.now(),
      edited_timestamp: null,
      mentions: [],
      mention_roles: [],
      mention_everyone: false
    }, channel);
  }
}