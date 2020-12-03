// client id: 784135061225734184
// https://discord.com/oauth2/authorize?client_id=<client id>&scope=bot accesezi asta ca sa dai invite la bot
import Discord, { Client, Message, PartialMessage } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const client: Client = new Discord.Client();
client.once("ready", () => {
  console.log("my body is ready");
}); 

client.on("message", async (message: Message) => {
  // console.log(message.content);
  if(message.content === "ping") {
    // return await message.channel.send("PONG!");
    return await message.reply("PONG!");
  }
});

client.on("messageDelete", (message: Message | PartialMessage) => {
  console.log("am sters:",message.content);
});

client.login(process.env.BOT_TOKEN);