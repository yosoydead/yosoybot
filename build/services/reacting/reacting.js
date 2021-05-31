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
exports.addMoney = exports.addComment = void 0;
const post_1 = require("./post");
const update_1 = require("./update");
function addComment(client, url, requestData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield post_1.postData(client, url, requestData);
    });
}
exports.addComment = addComment;
function addMoney(client, url, requestData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield update_1.updateData(client, url, requestData);
    });
}
exports.addMoney = addMoney;
