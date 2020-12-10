"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesMessageContainWeebAndTag = exports.weeb = void 0;
var ascii_art_1 = require("./ascii_art");
var getRandomStringFromArray_1 = __importDefault(require("../../utils/getRandomStringFromArray"));
function weeb() {
    return getRandomStringFromArray_1.default(ascii_art_1.ascii_art);
}
exports.weeb = weeb;
function doesMessageContainWeebAndTag(splitMessage) {
    var containsWeebAndTag = {
        tagging: false,
        weeb: false,
        tag: ""
    };
    for (var i = 0; i < splitMessage.length; i++) {
        var currentValue = splitMessage[i];
        if (currentValue.toLowerCase().includes("weeb") && containsWeebAndTag.weeb === false)
            containsWeebAndTag.weeb = true;
        if ((currentValue.startsWith("<@") && currentValue.endsWith(">")) && containsWeebAndTag.tagging === false) {
            containsWeebAndTag.tagging = true;
            containsWeebAndTag.tag = splitMessage[i];
        }
        // console.log(containsWeebAndTag);
        if (containsWeebAndTag.tagging === true && containsWeebAndTag.weeb === true)
            return containsWeebAndTag;
    }
    return containsWeebAndTag;
}
exports.doesMessageContainWeebAndTag = doesMessageContainWeebAndTag;
