// client id: 784135061225734184
// https://discord.com/developers/applications/784135061225734184/bot
// https://discord.com/oauth2/authorize?client_id=<client id>&scope=bot accesezi asta ca sa dai invite la bot
// https://discord.com/oauth2/authorize?client_id=784135061225734184&scope=bot
import Discord, { Client, Message, Guild, PartialMessage } from "discord.js";
import * as dotenv from "dotenv";
import { commandHandler } from "./commands";
import { MY_CHANNEL_IDS, SERVER_ACTION } from "./constants";
import { sendLogs } from "./utils/logJoinOrLeaveServer";
import { reactionHandler } from "./reacting";
import { FetchClient, IFetchClient } from "./services/FetchClient";
import CacheClient from "./CacheClient";
import dbFactory from "./utils/dbFactory";

dotenv.config();

const client: Client = new Discord.Client({
  partials: ["MESSAGE", "REACTION"]
});
const fetchClient: IFetchClient = new FetchClient();
const cache = new CacheClient();


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
  const myChannel: Guild = await client.guilds.fetch(MY_CHANNEL_IDS.YOSOYDEAD_SERVER);
  const channelEntry = myChannel.channels.cache.get(MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
  const message = sendLogs(guild, SERVER_ACTION.JOIN);

  channelEntry.send(message);
});

client.on("guildDelete", async (guild: Guild) => {
  const myChannel: Guild = await client.guilds.fetch(MY_CHANNEL_IDS.YOSOYDEAD_SERVER);
  const channelEntry = myChannel.channels.cache.get(MY_CHANNEL_IDS.INTRAT_PE_SERVERE);
  const message = sendLogs(guild, SERVER_ACTION.KICK);

  channelEntry.send(message);
});

client.on("message", (message: Message) => commandHandler(message, fetchClient));

client.on("messageDelete", (message: Message | PartialMessage) => {
  console.log("am sters:",message.content);
});

client.on("messageReactionAdd", (reaction, user) => reactionHandler(reaction, user, fetchClient));
// client.on("messageReactionRemove", (reaction, user) => reactionHandler(reaction, user, fetchClient));
// // cron function
function cron(ms, fn) {
  function cb() {
    clearTimeout(timeout);
    timeout = setTimeout(cb, ms);
    fn();
  }
  let timeout = setTimeout(cb, ms);
  return () => {};
}
// setup cron job 1500000
cron(1500000, async () => {
  // console.log(client.channels);
  const wakeupChannel: any = await client.channels.fetch(MY_CHANNEL_IDS.WAKEUP_CRONJOB);
  // console.log(wakeupChannel);
  wakeupChannel.send("Mesaj ca sa nu se duca botul la somn");
});

client.login(process.env.BOT_TOKEN)
  .then(() => {
    console.log("login");
    dbFactory.createInstance(process.env.NODE_ENV, fetchClient);
    
    client.user?.setActivity("%commands");
  })
  .catch(err => {
    console.log(err);
  });