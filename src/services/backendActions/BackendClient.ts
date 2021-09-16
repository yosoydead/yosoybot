import { IFetchClient } from "../FetchClient";
import { BACKEND_ROUTES, BOT_NAME, MESSAGE_COLORS, REPLY_MESSAGES, YOSOYDB_ERROR_MESSAGES } from "../../constants";
import { APP_MODES, BackendComment, BackendTransaction, IBackendClient, IBackendResponse, ICacheClient } from "../../types";
import { EmbedField, MessageEmbed } from "discord.js";
import { createEmbedFields } from "../../utils/createEmbedFields";
import { createMessageEmbed } from "../../utils/createMessageEmbed";
import cacheFactory from "../../utils/cacheFactory";

export default class BackendClient implements IBackendClient {
  private _baseUrl: string;
  private _client: IFetchClient;
  private _appMode: APP_MODES;

  constructor(client: IFetchClient, requestBaseUrl: string, appMode: APP_MODES) {
    this._baseUrl = requestBaseUrl;
    this._client = client;
    this._appMode = appMode;
  }

  getAppMode (): string {
    return this._appMode;
  }

  getRandomQuote(): Promise<MessageEmbed> {
    return this._client.get(`${this._baseUrl}${BACKEND_ROUTES.GET.randomQuote}`)
      .then(response => response.json())
      .then((json: IBackendResponse) => {
        const embedFields: EmbedField[] = createEmbedFields({
          "O veche zicala:": `${json.message}`
        });
        const color = json.status === "success" ? MESSAGE_COLORS.CHANNEL_JOIN : MESSAGE_COLORS.CHANNEL_LEFT;
        const messageEmbed: MessageEmbed = createMessageEmbed(
          color,
          " ",
          " ",
          embedFields,
          BOT_NAME,
          REPLY_MESSAGES.COMMANDS_FOOTER
        );

        return messageEmbed;
      })
      .catch(err => {
        return createMessageEmbed(
          MESSAGE_COLORS.CHANNEL_LEFT,
          "Error",
          YOSOYDB_ERROR_MESSAGES.RANDOM_QUOTE,
          [],
          BOT_NAME,
          REPLY_MESSAGES.COMMANDS_FOOTER
        );
      });
  }

  getUsersBank(): Promise<IBackendResponse> {
    return this._client.get(`${this._baseUrl}${BACKEND_ROUTES.GET.getUsersBank}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        const res: IBackendResponse = {
          status: "error",
          statusCode: 500,
          message: "Nu am putut sa fac request din varii motive pentru a lua users bank."
        };
      });
  }

  getUserTransactions(userId: string, numberOfTransactions: number): Promise<string> {
    return this._client.get(`${this._baseUrl}${BACKEND_ROUTES.GET.getUserTransactions}${userId}/${numberOfTransactions}`)
      .then((res) => {
        return res.json();
      })
      .then((r: IBackendResponse) => {
        // console.log("succes", r);
        return r.message;
      })
      .catch(() => {
        return "error";
      });
  }

  addQuote(comment: BackendComment): Promise<string> {
    return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addComment}`, {...comment})
      .then(response => response.json())
      .then((json: IBackendResponse) => {
        return json.message;
      })
      .catch(err => {
        cacheFactory.getInstance().updateCommentStore(comment);
        return YOSOYDB_ERROR_MESSAGES.ADD_QUOTE;
      });
  }

  addTransactions(transactions: BackendTransaction[]): Promise<string> {
    return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addTransactions}`, {transactions})
      .then(res => res.json())
      .then((json: IBackendResponse) => {
        return json.message;
      })
      .catch((err) => {
        return YOSOYDB_ERROR_MESSAGES.ADD_TRANSACTIONS;
      });
  }

  async sendCacheDataOnDemand(cacheClient: ICacheClient): Promise<string> {
    if (cacheFactory.getInstance().isCacheEmpty()) return Promise.resolve("Nu am nimic in cache.");
    cacheClient.lockStore();
    const cacheStore = cacheClient.getCurrentCache();
    const transactions = cacheStore.transactions;
    const comments = cacheStore.comments;
    const usersBank = await this.getUsersBank();
    
    if (usersBank.status === "error") return Promise.resolve(usersBank.message);

    transactions.map(t => {
      const user: any = usersBank.arrayOfStuff?.find((u: any) => u.discordUserId === t.discordUserId);
      /*
        - tine minte ca pentru reactii cu rublerts trimiti -1, de aia verifici daca suma
          totala e mai mica decat 1
        - in backend, pur si simplu se face old sum + amount pentru ca sunt situatii in
          care vreau sa si adaug fonduri, nu doar sa scad fonduri :). poate nu e ok dar
          merge si asa
      */
      if (user.rublerts + t.cost < 0) {
        t.status = "rejected";
        t.cost = 0;
        t.reason = `No more funds! ${t.reason}`;
      } else {
        t.status = "successful";
        user.rublerts -= t.cost;
      }
    });

    return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addTransactions}`, {transactions})
      .then(res => res.json())
      .then((transactionsRes: IBackendResponse) => {
        if (transactionsRes.status === "error") throw new Error(YOSOYDB_ERROR_MESSAGES.BULK_UPDATE_TRANSACTIONS);

        // daca ajung aici, inseamna ca toate tranzactiile au fost adaugate cu succes
        // sterg tranzactiile din cache si trimit request pt quotes
        return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addMultipleComments}`, {comments});
      })
      .then(res => res.json())
      .then((commentsRes: IBackendResponse) => {
        if (commentsRes.status === "error") throw new Error(YOSOYDB_ERROR_MESSAGES.BULK_UPDATE_COMMENTS);

        // daca ajung aici, inseamna ca toate comentariile si tranzactiile au fost adaugate cu success
        cacheClient.clearMainCache();
        cacheClient.syncBetweenSecondaryAndMainStore();
        cacheClient.unlockStore();

        return REPLY_MESSAGES.DB_BULK_UPDATE;
      })
      .catch(err => {
        // aici ajunge daca dau cu throw din oricare then
        return YOSOYDB_ERROR_MESSAGES.BULK_UPDATE_FAIL;
      });
  }
}