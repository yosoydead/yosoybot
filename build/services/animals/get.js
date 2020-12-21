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
exports.getAnimalFact = void 0;
const constants_1 = require("../../constants");
function getAnimalFact(client, animalUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield client.get(animalUrl);
            const requestData = yield request.json();
            if (animalUrl === constants_1.ANIMAL_FACTS_APIS.CATS)
                return requestData.data[0];
            else
                return requestData.facts[0];
        }
        catch (err) {
            return constants_1.REPLY_MESSAGES.EMPTY_ANIMAL_FACT;
        }
    });
}
exports.getAnimalFact = getAnimalFact;
