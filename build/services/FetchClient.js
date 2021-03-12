"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class FetchClient {
    get(url) {
        return node_fetch_1.default(url);
    }
    post(url, requestBody) {
        return node_fetch_1.default(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                "Sender": "yosoybot"
            }
        });
    }
    update(url, requestBody) {
        return node_fetch_1.default(url, {
            method: "PATCH",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                "Sender": "yosoybot"
            }
        });
    }
}
exports.FetchClient = FetchClient;
