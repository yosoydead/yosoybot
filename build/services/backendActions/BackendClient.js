"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            console.log(json);
            return json.message;
        })
            .catch(err => {
            return constants_1.REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
        });
    }
    addQuote(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._client.post(`${this._baseUrl}${constants_1.BACKEND_ROUTES.POST.addComment}`, Object.assign({}, comment))
                .then(response => response.json())
                .then((json) => {
                console.log(json);
                return json.message;
            })
                .catch(err => {
                console.log();
                return constants_1.REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
            });
        });
    }
}
exports.default = BackendClient;
