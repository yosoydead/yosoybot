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
exports.getData = void 0;
const constants_1 = require("../../constants");
// de aici o sa fac request pentru user/users, comment/comments si altele
function getData(client, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield client.get(url);
            const requestData = yield request.json();
            return requestData;
        }
        catch (err) {
            return constants_1.REPLY_MESSAGES.EMPTY_ANIMAL_FACT;
        }
    });
}
exports.getData = getData;
