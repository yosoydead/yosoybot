"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const createEmbedFields_1 = require("../../utils/createEmbedFields");
const createMessageEmbed_1 = require("../../utils/createMessageEmbed");
const cacheFactory_1 = __importDefault(require("../../utils/cacheFactory"));
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
            cacheFactory_1.default.getInstance().updateCommentStore(comment);
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
    sendCacheDataOnDemand(cacheClient) {
        cacheClient.lockStore();
        const cacheStore = cacheClient.getCurrentCache();
        const transactions = cacheStore.transactions;
        const comments = cacheStore.comments;
        return this._client.post(`${this._baseUrl}${constants_1.BACKEND_ROUTES.POST.addTransactions}`, { transactions })
            .then(res => res.json())
            .then((transactionsRes) => {
            if (transactionsRes.status === "error")
                throw new Error(constants_1.YOSOYDB_ERROR_MESSAGES.BULK_UPDATE_TRANSACTIONS);
            // daca ajung aici, inseamna ca toate tranzactiile au fost adaugate cu succes
            // sterg tranzactiile din cache si trimit request pt quotes
            return this._client.post(`${this._baseUrl}${constants_1.BACKEND_ROUTES.POST.addMultipleComments}`, { comments });
        })
            .then(res => res.json())
            .then((commentsRes) => {
            if (commentsRes.status === "error")
                throw new Error(constants_1.YOSOYDB_ERROR_MESSAGES.BULK_UPDATE_COMMENTS);
            // daca ajung aici, inseamna ca toate comentariile si tranzactiile au fost adaugate cu success
            cacheClient.clearMainCache();
            cacheClient.syncBetweenSecondaryAndMainStore();
            cacheClient.unlockStore();
        })
            .catch(err => {
            // aici ajunge daca dau cu throw din oricare then
            console.log(err);
        });
    }
}
exports.default = BackendClient;
