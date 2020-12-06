// client id: 784135061225734184
// https://discord.com/developers/applications/784135061225734184/bot
// https://discord.com/oauth2/authorize?client_id=<client id>&scope=bot accesezi asta ca sa dai invite la bot
// https://discord.com/oauth2/authorize?client_id=784135061225734184&scope=bot
import Discord, { Client, Message, Guild, PartialMessage, MessageReaction, User } from "discord.js";
import * as dotenv from "dotenv";
import { commandHandler } from "./commands";
import { MY_CHANNEL_IDS } from "./constants";

dotenv.config();

const client: Client = new Discord.Client();
client.once("ready", async () => {
  console.log("my body is ready");
  // const channelEntry = await client.channels.fetch(MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
  // console.log(channelEntry);
  
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

client.on("guildCreate", async (guild: Guild) => {
  console.log("intrat in", guild.name);
  const myChannel: Guild = await client.guilds.fetch(MY_CHANNEL_IDS.YOSOYDEAD_SERVER);
  console.log(myChannel.name);
  const channelEntry = await myChannel.channels.cache.get(MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
  channelEntry.send("salut");
});

client.on("guildDelete", (guild: Guild) => {
  console.log("iesit din", guild);
});

client.on("message", commandHandler);

client.on("messageDelete", (message: Message | PartialMessage) => {
  console.log("am sters:",message.content);
});


client.on("messageReactionAdd", async(...args) => {
  // console.log(args);
  
  // console.log(reaction);
  // console.log(reaction);
  // const bla = "face_vomiting";
  // if (reaction.emoji.name === bla) console.log("da");
  
  // await reaction.message.channel.send(reaction.emoji.name);
  // console.log(reaction.emoji.toString());
  console.log(args);
  
  
  
  console.log("----------------------------------------------");
  // console.log(user);
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