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
    getUsersBank() {
        return this._client.get(`${this._baseUrl}${constants_1.BACKEND_ROUTES.GET.getUsersBank}`)
            .then((res) => {
            return res.json();
        })
            .catch((err) => {
            const res = {
                status: "error",
                statusCode: 500,
                message: "Nu am putut sa fac request din varii motive pentru a lua users bank."
            };
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
        return __awaiter(this, void 0, void 0, function* () {
            if (cacheFactory_1.default.getInstance().isCacheEmpty())
                return Promise.resolve("Nu am nimic in cache.");
            cacheClient.lockStore();
            const cacheStore = cacheClient.getCurrentCache();
            const transactions = cacheStore.transactions;
            const comments = cacheStore.comments;
            const usersBank = yield this.getUsersBank();
            if (usersBank.status === "error")
                return Promise.resolve(usersBank.message);
            transactions.map(t => {
                var _a;
                const user = (_a = usersBank.arrayOfStuff) === null || _a === void 0 ? void 0 : _a.find((u) => u.discordUserId === t.discordUserId);
                /*
                  - tine minte ca pentru reactii cu rublerts trimiti -1, de aia verifici daca suma
                    totala e mai mica decat 1
                  - in backend, pur si simplu se face old sum + amount pentru ca sunt situatii in
                    care vreau sa si adaug fonduri, nu doar sa scad fonduri :). poate nu e ok dar
                    merge si asa
                */
                if (user.rublerts + t.cost < 0) {
                    t.status = "rejected";
                    t.cost = 0;
                    t.reason = `No more funds! ${t.reason}`;
                }
                else {
                    t.status = "successful";
                    user.rublerts -= t.cost;
                }
            });
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
                return constants_1.REPLY_MESSAGES.DB_BULK_UPDATE;
            })
                .catch(err => {
                // aici ajunge daca dau cu throw din oricare then
                return constants_1.YOSOYDB_ERROR_MESSAGES.BULK_UPDATE_FAIL;
            });
        });
    }
}
exports.default = BackendClient;
