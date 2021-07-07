import { IFetchClient } from "../FetchClient";
import { BACKEND_ROUTES, BOT_NAME, MESSAGE_COLORS, REPLY_MESSAGES, YOSOYDB_ERROR_MESSAGES } from "../../constants";
import { APP_MODES, BackendComment, BackendTransaction, IBackendClient, IBackendResponse } from "../../types";
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

  addQuote(comment: BackendComment): Promise<string> {
    return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addComment}`, {...comment})
      .then(response => response.json())
      .then((json: IBackendResponse) => {
        return json.message;
      })
      .catch(err => {
        cacheFactory.getInstance().updateStore("comments", comment);
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
}