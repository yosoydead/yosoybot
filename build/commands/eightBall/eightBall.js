"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eightBall = [
    "As i see it, yes",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "It is certain",
    "It is decidedly so"
];
exports.default = (function () {
    var index = Math.floor(Math.random() * eightBall.length);
    return eightBall[index];
});
