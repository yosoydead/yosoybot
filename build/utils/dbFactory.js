"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BackendClient_1 = __importDefault(require("../services/backendActions/BackendClient"));
const constants_1 = require("../constants");
let instance;
const dbFactory = {
    getInstance: () => {
        return instance;
    },
    createInstance: (appMode, fetchClient) => {
        if (appMode === "local") {
            instance = new BackendClient_1.default(fetchClient, constants_1.BACKEND_BASE_URLS.LOCAL);
        }
        else if (appMode === "production") {
            instance = new BackendClient_1.default(fetchClient, constants_1.BACKEND_BASE_URLS.LOCAL_GOKU);
        }
        else {
            throw new Error("App mode necunoscut");
        }
    }
};
exports.default = dbFactory;
