"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("../config/db");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const run = async () => {
    await (0, db_1.connectDB)();
    const email = process.env.ADMIN_EMAIL || 'admin@juice.local';
    const existing = await User_1.default.findOne({ email });
    if (existing) {
        console.log('Admin already exists:', email);
        process.exit(0);
    }
    const hashed = await bcryptjs_1.default.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
    const admin = new User_1.default({ username: 'Admin', email, password: hashed, role: 'admin' });
    await admin.save();
    console.log('Admin created:', email);
    process.exit(0);
};
run().catch(err => {
    console.error(err);
    process.exit(1);
});
