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
exports.postData = void 0;
const constants_1 = require("../../constants");
// de aici o sa fac request pentru user/users, comment/comments si altele
function postData(client, url, requestData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield client.post(url, requestData);
            const response = yield request.json();
            return response;
        }
        catch (err) {
            return constants_1.REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
        }
    });
}
exports.postData = postData;
