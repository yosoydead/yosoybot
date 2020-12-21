"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (array) => {
    if (array.length === 0)
        return "";
    // math.floor nu rotunjeste
    // MDN: The Math.floor() function returns the largest integer less than or equal to a given number.
    const index = Math.floor(Math.random() * array.length);
    return array[index];
};
