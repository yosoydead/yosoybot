import { IFetchClient } from "../FetchClient";
import { REPLY_MESSAGES, BACKEND_ROUTES } from "../../constants";
import { BackendComment, IBackendClient, IBackendResponse } from "../../types";

export default class BackendClient implements IBackendClient {
  private _baseUrl: string;
  private _client: IFetchClient;

  constructor(client: IFetchClient, requestBaseUrl: string) {
    this._baseUrl = requestBaseUrl;
    this._client = client;
  }

  getRandomQuote() {
    return this._client.get(`${this._baseUrl}${BACKEND_ROUTES.GET.randomQuote}`)
      .then(response => response.json())
      .then((json: IBackendResponse) => {
        console.log(json);
        
        return json.message;
      })
      .catch(err => {
        return REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
      });
  }

  async addQuote(comment: BackendComment) {
    return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addComment}`, {...comment})
      .then(response => response.json())
      .then((json: IBackendResponse) => {
        console.log(json);

        return json.message;
      })
      .catch(err => {
        console.log();
        return REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
      });
  }
}