"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CacheClient_1 = __importDefault(require("../CacheClient"));
let cacheInstance;
const cacheFactory = {
    getInstance: () => {
        return cacheInstance;
    },
    createInstance: () => {
        cacheInstance = new CacheClient_1.default();
    }
};
exports.default = cacheFactory;
