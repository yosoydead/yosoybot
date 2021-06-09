import { IFetchClient } from "../FetchClient";
import { REPLY_MESSAGES, BACKEND_ROUTES } from "../../constants";

export class BackendClient {
  private _baseUrl: string;
  private _client: IFetchClient;

  constructor(client: IFetchClient, requestBaseUrl: string) {
    this._baseUrl = requestBaseUrl;
    this._client = client;
  }

  getRandomQuote() {
    return this._client.get(`${this._baseUrl}${BACKEND_ROUTES.GET.randomQuote}`)
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(err => {
        return REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
      });
  }

  addQuote(comment: BackendComment) {
    console.log("trimit comment la backend", {...comment});
    
    // return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addComment}`, {...comment})
    //   .then()
    //   .catch();
  }
}