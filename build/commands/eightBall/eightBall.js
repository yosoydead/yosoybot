"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eightBall = void 0;
const getRandomStringFromArray_1 = __importDefault(require("../../utils/getRandomStringFromArray"));
exports.eightBall = [
    "As i see it, yes",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "It is certain",
    "It is decidedly so"
];
exports.default = () => {
    return getRandomStringFromArray_1.default(exports.eightBall);
};
