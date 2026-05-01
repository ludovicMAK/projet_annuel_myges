"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readEnv = readEnv;
function readEnv(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} required environment variable is missing.`);
    }
    return value;
}
