"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (payload) => {
    return User_1.default.create(payload);
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return User_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    return User_1.default.findById(id);
};
exports.findUserById = findUserById;
