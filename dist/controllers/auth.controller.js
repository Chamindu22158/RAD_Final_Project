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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.signup = void 0;
const authService = __importStar(require("../services/auth.service"));
const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.signupService(username, email, password);
        res.status(201).json({ message: 'User created', user: { id: user._id, email: user.email, username: user.username } });
    }
    catch (err) {
        next(err);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.loginService(email, password);
        // set refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, user });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const refresh = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token)
            return res.status(401).json({ message: 'No token' });
        const newAccess = await authService.refreshService(token);
        res.json({ accessToken: newAccess });
    }
    catch (err) {
        next(err);
    }
};
exports.refresh = refresh;
const logout = async (_req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
};
exports.logout = logout;
