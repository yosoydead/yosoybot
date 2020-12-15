import { commandHandler } from "../../src/commands";
import { Message, Client, TextChannel, User, Guild, MessageEmbed } from "discord.js";
import MockedUser from "../../mocks/discordJS/MockedUser";
import MockedGuild from "../../mocks/discordJS/MockedGuild";
import MockedMessage from "../../mocks/discordJS/MockedMessage";
import MockedTextChannel from "../../mocks/discordJS/MockedTextChannel";
import { Rejecting, Resolving } from "../../mocks/fetchClient/MockedFetchClient";
import { IFetchClient } from "../../src/services/FetchClient";
import { REPLY_MESSAGES } from "../../src/constants";
import { eightBall} from "../.././src/commands/eightBall/eightBall";
import { CommandsObject } from "../../src/commands/CommandNames";

describe("commandHandler", () => {
  let mockDiscordClient: Client, mockGuild: Guild, mockUser: User, mockBot: User, mockTextChannel: TextChannel, resolve: IFetchClient;
  const sendSpy = jest.fn((content) => {
    return new Promise<any>((resolve, reject) => {
      resolve(new MockedMessage("nu are importanta ce scriu aici", mockTextChannel, mockBot));
    });
  });
  const replySpy = jest.fn();
  const fetchSpy = jest.fn();

  beforeEach(() => {
    mockDiscordClient = new Client();
    mockGuild = new MockedGuild(mockDiscordClient);
    mockUser = new MockedUser(mockDiscordClient, "Yosoydead", false);
    mockBot = new MockedUser(mockDiscordClient, "yosoybot", true);
    mockTextChannel = new MockedTextChannel(mockGuild);
    resolve = new Resolving(fetchSpy, "alo");
    
    sendSpy.mockClear();
    replySpy.mockClear();
    fetchSpy.mockClear();
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

  it("should return a random quote from 8ball if the command is correct", async () => {
    const message: Message = new MockedMessage("%8ball is testing good for you", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);

    expect(replySpy).toHaveBeenCalledTimes(1);
    expect(eightBall).toContain(replySpy.mock.calls[0][0]);
  });

  it("should return a warning message when using the 8ball command incorrectly", async () => {
    const message: Message = new MockedMessage("%8ball", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);

    expect(replySpy).toHaveBeenCalledTimes(1);
    expect(REPLY_MESSAGES.EMPTY_EIGHT_BALL).toContain(replySpy.mock.calls[0][0]);
  });

  it("should return ping/pong from the appropriate commands", async () => {
    expect(replySpy).toHaveBeenCalledTimes(0);
    let message: Message = new MockedMessage("%ping", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);

    expect(replySpy).toHaveBeenCalledTimes(1);
    expect(replySpy.mock.calls[0][0]).toContain("PONG");

    message = new MockedMessage("%pong", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);

    expect(replySpy).toHaveBeenCalledTimes(2);
    expect(replySpy.mock.calls[1][0]).toContain("PING");
  });


  // nu ma chinui sa mai fac mock la resolve/reject si sa vad ce imi returneaza
  // functiile deja o fost testate si am testat si service GET deci nu are rost
  it("should trigger an api request for cats/dogs command", async () => {
    let message: Message = new MockedMessage("%cats", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);

    expect(replySpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    message = new MockedMessage("%dogs", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);

    expect(replySpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("should return a list of all the commands of the bot", async () => {
    const message: Message = new MockedMessage("%commands", mockTextChannel, mockUser);
    message.reply = replySpy;
    await commandHandler(message, resolve);

    expect(replySpy).toHaveBeenCalledTimes(1);
    const msgEmbed: MessageEmbed = replySpy.mock.calls[0][0];
    const commands = msgEmbed.fields.map(el => {
      return el.name;
    });
    expect(commands).toEqual(Object.keys(CommandsObject));
  });
});