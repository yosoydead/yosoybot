"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesMessageContainWeebAndTag = exports.weeb = void 0;
const ascii_art_1 = require("./ascii_art");
const getRandomStringFromArray_1 = __importDefault(require("../../utils/getRandomStringFromArray"));
function weeb() {
    return getRandomStringFromArray_1.default(ascii_art_1.ascii_art);
}
exports.weeb = weeb;
function doesMessageContainWeebAndTag(splitMessage) {
    const containsWeebAndTag = {
        tagging: false,
        weeb: false,
        tag: ""
    };
    for (let i = 0; i < splitMessage.length; i++) {
        const currentValue = splitMessage[i];
        if (currentValue.toLowerCase().includes("weeb") && containsWeebAndTag.weeb === false)
            containsWeebAndTag.weeb = true;
        if ((currentValue.startsWith("<@") && currentValue.endsWith(">")) && containsWeebAndTag.tagging === false) {
            containsWeebAndTag.tagging = true;
            containsWeebAndTag.tag = splitMessage[i];
        }
        if (containsWeebAndTag.tagging === true && containsWeebAndTag.weeb === true)
            return containsWeebAndTag;
    }
    return containsWeebAndTag;
}
exports.doesMessageContainWeebAndTag = doesMessageContainWeebAndTag;
