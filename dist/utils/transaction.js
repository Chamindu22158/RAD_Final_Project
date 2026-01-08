"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionId = void 0;
const generateTransactionId = () => {
    return `TX-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
};
exports.generateTransactionId = generateTransactionId;
