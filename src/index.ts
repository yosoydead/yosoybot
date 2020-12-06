// client id: 784135061225734184
// https://discord.com/developers/applications/784135061225734184/bot
// https://discord.com/oauth2/authorize?client_id=<client id>&scope=bot accesezi asta ca sa dai invite la bot
// https://discord.com/oauth2/authorize?client_id=784135061225734184&scope=bot
import Discord, { Client, Message, Guild, PartialMessage } from "discord.js";
import * as dotenv from "dotenv";
import { commandHandler } from "./commands";

dotenv.config();

const client: Client = new Discord.Client();
client.once("ready", () => {
  console.log("my body is ready");
  // console.log(client.guilds);
  // console.log("---------------------------------------------------");
  
  //aparent, channels.fetch iti returneaza un obiect de tipul Channel
  //id ala e de pe serverul meu adica canalul general care e de tip TextChannel care are o functie de send
  //cauta in documentatie
  // client.channels.fetch("781108831421333538")
  //   .then((channel) => {
  //     // console.log(channel);
  //     // channel.send("i live, dickheads");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});

client.on("guildCreate", (guild: Guild) => {
  console.log("intrat in", guild.name);
});

client.on("guildDelete", (guild: Guild) => {
  console.log("iesit din", guild);
});

client.on("message", commandHandler);

client.on("messageDelete", (message: Message | PartialMessage) => {
  console.log("am sters:",message.content);
});

// // cron function
// function cron(ms, fn) {
//   function cb() {
//       clearTimeout(timeout)
//       timeout = setTimeout(cb, ms)
//       fn()
//   }
//   let timeout = setTimeout(cb, ms)
//   return () => {}
// }
// // setup cron job
// cron(2000, () => console.log("cron job"))

client.login(process.env.BOT_TOKEN)
  .then(() => {
    client.user?.setActivity("!commands");
  })
  .catch(err => {
    console.log(err);
  });