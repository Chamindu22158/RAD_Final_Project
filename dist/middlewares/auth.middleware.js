"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header)
            return res.status(401).json({ message: 'No token' });
        const token = header.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
