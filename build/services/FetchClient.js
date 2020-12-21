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
}
exports.FetchClient = FetchClient;
