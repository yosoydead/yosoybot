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
exports.getOpenWeatherData = void 0;
const createMessageEmbed_1 = require("../../utils/createMessageEmbed");
const createEmbedFields_1 = require("../../utils/createEmbedFields");
const constants_1 = require("../../constants");
const determineIcon_1 = require("./determineIcon");
function getOpenWeatherData(client, appKey, city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield client.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=metric`);
            // weather o sa fie mereu un array
            // pentru vremea curenta, cel mai simplu e sa iei index 0
            const requestData = yield request.json();
            const embedFields = createEmbedFields_1.createEmbedFields({
                "Temperatura:": `${requestData.main.temp} Celsius`,
                "Se simte": `${requestData.main.feels_like} Celsius`,
                "Minima zilei": `${requestData.main.temp_min} Celsius`,
                "Maxima zilei": `${requestData.main.temp_max} Celsius`
            });
            const icon = determineIcon_1.weatherIcon(requestData.weather[0].id);
            const messageEmbed = createMessageEmbed_1.createMessageEmbed(constants_1.MESSAGE_COLORS.CHANNEL_JOIN, `In orasul ${requestData.name}: ${icon}`, "Cateva detalii", embedFields, "Yosoybot", constants_1.REPLY_MESSAGES.COMMANDS_FOOTER);
            return messageEmbed;
        }
        catch (error) {
            return createMessageEmbed_1.createMessageEmbed(constants_1.MESSAGE_COLORS.CHANNEL_LEFT, "Vremea :skull:", "Poate ai gresit numele orasului sau incearca mai tarziu.", [], "Yosoybot", constants_1.REPLY_MESSAGES.COMMANDS_FOOTER);
        }
    });
}
exports.getOpenWeatherData = getOpenWeatherData;
