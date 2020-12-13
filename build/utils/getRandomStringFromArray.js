"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (array) {
    if (array.length === 0)
        return "";
    // math.floor nu rotunjeste
    // MDN: The Math.floor() function returns the largest integer less than or equal to a given number.
    var index = Math.floor(Math.random() * array.length);
    return array[index];
});
