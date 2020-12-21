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
exports.getMeteo = void 0;
function getMeteo(client, appKey, city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield client.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=metric`);
            const bla = yield request.json();
            console.log(bla);
            return "";
        }
        catch (error) {
            return "";
        }
    });
}
exports.getMeteo = getMeteo;
