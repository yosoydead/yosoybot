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
            .then((json) => {
            return json.message;
        })
            .catch(err => {
            return constants_1.YOSOYDB_ERROR_MESSAGES.RANDOM_QUOTE;
        });
    }
    addQuote(comment) {
        return this._client.post(`${this._baseUrl}${constants_1.BACKEND_ROUTES.POST.addComment}`, Object.assign({}, comment))
            .then(response => response.json())
            .then((json) => {
            return json.message;
        })
            .catch(err => {
            return constants_1.YOSOYDB_ERROR_MESSAGES.ADD_QUOTE;
        });
    }
}
exports.default = BackendClient;
