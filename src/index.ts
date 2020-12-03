// client id: 784135061225734184
// https://discord.com/developers/applications/784135061225734184/bot
// https://discord.com/oauth2/authorize?client_id=<client id>&scope=bot accesezi asta ca sa dai invite la bot
// https://discord.com/oauth2/authorize?client_id=784135061225734184&scope=bot
import Discord, { Client, Message, PartialMessage, Guild } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();
const regex = /^!ball\s.+/i;
const eightBall: string[] = [
  "As i see it, yes",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "It is certain",
  "It is decidedly so"
];

const client: Client = new Discord.Client();
client.once("ready", () => {
  console.log("my body is ready");
});

client.on("guildCreate", (guild: Guild) => {
  console.log("intrat in", guild.name);
});

client.on("guildDelete", (guild: Guild) => {
  console.log("iesit din", guild);
});

client.on("message", async (message: Message) => {
  // console.log(message.content);
  if(message.content === "ping") {
    // return await message.channel.send("PONG!");
    return await message.reply("PONG!");
  }


  if (regex.exec(message.content.toLowerCase())) {
    const index: number = Math.floor(Math.random() * eightBall.length);
    return await message.reply(eightBall[index]);
  }
});

client.on("messageDelete", (message: Message | PartialMessage) => {
  console.log("am sters:",message.content);
});

client.login(process.env.BOT_TOKEN);