"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshService = exports.loginService = exports.signupService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokens_1 = require("../utils/tokens");
const userRepo = __importStar(require("../repositories/user.repository"));
const signupService = async (username, email, password) => {
    const existing = await userRepo.findUserByEmail(email);
    if (existing)
        throw new Error('Email already in use');
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await userRepo.createUser({ username, email, password: hashed, role: 'user' });
    return user;
};
exports.signupService = signupService;
const loginService = async (email, password) => {
    const user = await userRepo.findUserByEmail(email);
    if (!user)
        throw new Error('Invalid credentials');
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        throw new Error('Invalid credentials');
    const payload = { id: user._id.toString(), role: user.role, email: user.email };
    const accessToken = (0, tokens_1.generateAccessToken)(payload);
    const refreshToken = (0, tokens_1.generateRefreshToken)(payload);
    return { accessToken, refreshToken, user: { id: user._id, email: user.email, role: user.role, username: user.username } };
};
exports.loginService = loginService;
const refreshService = async (token) => {
    const payload = (0, tokens_1.verifyRefreshToken)(token);
    const newAccess = (0, tokens_1.generateAccessToken)({ id: payload.id, role: payload.role, email: payload.email });
    return newAccess;
};
exports.refreshService = refreshService;
