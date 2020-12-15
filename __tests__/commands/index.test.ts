import { commandHandler } from "../../src/commands";
import { Message, Client, TextChannel, User, Guild } from "discord.js";
import MockedUser from "../../mocks/discordJS/MockedUser";
import MockedGuild from "../../mocks/discordJS/MockedGuild";
import MockedMessage from "../../mocks/discordJS/MockedMessage";
import MockedTextChannel from "../../mocks/discordJS/MockedTextChannel";
import { Rejecting, Resolving } from "../../mocks/fetchClient/MockedFetchClient";
import { IFetchClient } from "../../src/services/FetchClient";
import { REPLY_MESSAGES } from "../../src/constants";

describe("commandHandler", () => {
  let mockDiscordClient: Client, mockGuild: Guild, mockUser: User, mockBot: User, mockTextChannel: TextChannel, resolve: IFetchClient;
  const sendSpy = jest.fn((content) => {
    return new Promise<any>((resolve, reject) => {
      resolve(new MockedMessage("nu are importanta ce scriu aici", mockTextChannel, mockBot));
    });
  });
  const replySpy = jest.fn();

  beforeEach(() => {
    mockDiscordClient = new Client();
    mockGuild = new MockedGuild(mockDiscordClient);
    mockUser = new MockedUser(mockDiscordClient, "Yosoydead", false);
    mockBot = new MockedUser(mockDiscordClient, "yosoybot", true);
    mockTextChannel = new MockedTextChannel(mockGuild);
    resolve = new Resolving(jest.fn(), "alo");
    
    sendSpy.mockClear();
    replySpy.mockClear();
  });
  
  it("should return undefined if the message contains plain text, no tags, commands or emotes or was sent by the bot itself", async () => {
    const message: Message = new MockedMessage("salut", mockTextChannel, mockUser);
    const botMessage = new MockedMessage("alo", mockTextChannel, mockBot);
    
    const result = await commandHandler(message, resolve);
    const botResult = await commandHandler(botMessage, resolve);
    
    expect(result).toBeUndefined();
    expect(botResult).toBeUndefined();
  });
  
  it("should return cancerous weeb ascii if the message sent contains a tag and the word weeb", async () => {
    mockTextChannel.send = sendSpy;
    const message: Message = new MockedMessage("<@564646465> fucking weeb", mockTextChannel, mockUser);
    const result = await commandHandler(message, resolve);

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(result?.author.username).toEqual("yosoybot");
  });

  it("should return undefined when the first character that should be a command is not known by the bot (ex: !, #, %, etc)", async () => {
    const message: Message = new MockedMessage("!salut", mockTextChannel, mockUser);
    const result = await commandHandler(message, resolve);

    expect(result).toBeUndefined();
  });

  it("should return a string saying the command does not exist", async () => {
    const message: Message = new MockedMessage("%hfbsdkljfds", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);
    
    expect(replySpy.mock.calls[0][0]).toEqual(REPLY_MESSAGES.UNKNOWN_COMMAND);
    expect(replySpy).toHaveBeenCalledTimes(1);
  });


});