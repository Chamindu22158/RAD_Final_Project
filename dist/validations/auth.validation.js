"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const validateSignup = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res.status(400).json({ message: 'username, email and password required' });
    next();
};
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'email and password required' });
    next();
};
exports.validateLogin = validateLogin;
