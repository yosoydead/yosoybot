"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const createEmbedFields_1 = require("../../utils/createEmbedFields");
const createMessageEmbed_1 = require("../../utils/createMessageEmbed");
class BackendClient {
    constructor(client, requestBaseUrl, appMode) {
        this._baseUrl = requestBaseUrl;
        this._client = client;
        this._appMode = appMode;
    }
    getAppMode() {
        return this._appMode;
    }
    getRandomQuote() {
        return this._client.get(`${this._baseUrl}${constants_1.BACKEND_ROUTES.GET.randomQuote}`)
            .then(response => response.json())
            .then((json) => {
            const embedFields = createEmbedFields_1.createEmbedFields({
                "O veche zicala:": `${json.message}`
            });
            const color = json.status === "success" ? constants_1.MESSAGE_COLORS.CHANNEL_JOIN : constants_1.MESSAGE_COLORS.CHANNEL_LEFT;
            const messageEmbed = createMessageEmbed_1.createMessageEmbed(color, " ", " ", embedFields, constants_1.BOT_NAME, constants_1.REPLY_MESSAGES.COMMANDS_FOOTER);
            return messageEmbed;
        })
            .catch(err => {
            return createMessageEmbed_1.createMessageEmbed(constants_1.MESSAGE_COLORS.CHANNEL_LEFT, "Error", constants_1.YOSOYDB_ERROR_MESSAGES.RANDOM_QUOTE, [], constants_1.BOT_NAME, constants_1.REPLY_MESSAGES.COMMANDS_FOOTER);
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
    addTransactions(transactions) {
        return this._client.post(`${this._baseUrl}${constants_1.BACKEND_ROUTES.POST.addTransactions}`, { transactions })
            .then(res => res.json())
            .then((json) => {
            return json.message;
        })
            .catch((err) => {
            return constants_1.YOSOYDB_ERROR_MESSAGES.ADD_TRANSACTIONS;
        });
    }
}
exports.default = BackendClient;
