import { IFetchClient } from "../FetchClient";
import { BACKEND_ROUTES, MESSAGE_COLORS, REPLY_MESSAGES, YOSOYDB_ERROR_MESSAGES } from "../../constants";
import { BackendComment, IBackendClient, IBackendResponse } from "../../types";
import { EmbedField, MessageEmbed } from "discord.js";
import { createEmbedFields } from "../../utils/createEmbedFields";
import { createMessageEmbed } from "../../utils/createMessageEmbed";

export default class BackendClient implements IBackendClient {
  private _baseUrl: string;
  private _client: IFetchClient;

  constructor(client: IFetchClient, requestBaseUrl: string) {
    this._baseUrl = requestBaseUrl;
    this._client = client;
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
          "Yosoybot",
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
          "Yosoybot",
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
        return YOSOYDB_ERROR_MESSAGES.ADD_QUOTE;
      });
  }
}