"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchClient = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var FetchClient = /** @class */ (function () {
    function FetchClient() {
    }
    FetchClient.prototype.get = function (url) {
        return node_fetch_1.default(url);
    };
    return FetchClient;
}());
exports.FetchClient = FetchClient;
