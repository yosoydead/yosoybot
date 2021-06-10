import { IFetchClient } from "../FetchClient";
import { BACKEND_ROUTES, YOSOYDB_ERROR_MESSAGES } from "../../constants";
import { BackendComment, IBackendClient, IBackendResponse } from "../../types";

export default class BackendClient implements IBackendClient {
  private _baseUrl: string;
  private _client: IFetchClient;

  constructor(client: IFetchClient, requestBaseUrl: string) {
    this._baseUrl = requestBaseUrl;
    this._client = client;
  }

  getRandomQuote(): Promise<string> {
    return this._client.get(`${this._baseUrl}${BACKEND_ROUTES.GET.randomQuote}`)
      .then(response => response.json())
      .then((json: IBackendResponse) => {
        return json.message;
      })
      .catch(err => {
        return YOSOYDB_ERROR_MESSAGES.RANDOM_QUOTE;
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