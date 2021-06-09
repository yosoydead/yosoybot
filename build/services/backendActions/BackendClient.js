"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
class BackendClient {
    constructor(client, requestBaseUrl) {
        this._baseUrl = requestBaseUrl;
        this._client = client;
    }
    getRandomQuote() {
        return this._client.get(`${this._baseUrl}${constants_1.BACKEND_ROUTES.GET.randomQuote}`)
            .then(response => response.json())
            .then(json => {
            return json;
        })
            .catch(err => {
            return constants_1.REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
        });
    }
    addQuote(comment) {
        console.log("trimit comment la backend", Object.assign({}, comment));
        // return this._client.post(`${this._baseUrl}${BACKEND_ROUTES.POST.addComment}`, {...comment})
        //   .then()
        //   .catch();
    }
}
exports.default = BackendClient;
