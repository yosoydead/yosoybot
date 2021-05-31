"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheClient {
    constructor() {
        this.store = {
            quotes: [],
            bank: []
        };
    }
    getStore() {
        return this.store;
    }
    setStore(updatePart, valueToAdd) {
        if (updatePart === "quotes") {
            console.log("quotes");
        }
        else if (updatePart === "bank") {
            console.log("bank");
        }
    }
}
exports.default = CacheClient;
