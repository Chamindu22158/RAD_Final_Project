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
exports.getAllOrders = exports.getMyOrders = exports.createOrder = void 0;
const orderService = __importStar(require("../services/order.service"));
const createOrder = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: 'Unauthorized' });
        const { productId, selectedAlcohol, totalAmount, category } = req.body;
        const order = await orderService.createOrderService({
            userId: user.id,
            productId,
            category,
            selectedAlcohol,
            totalAmount
        });
        const populated = await order.populate('productId');
        res.status(201).json(populated);
    }
    catch (err) {
        next(err);
    }
};
exports.createOrder = createOrder;
const getMyOrders = async (req, res, next) => {
    try {
        const user = req.user;
        const orders = await orderService.listUserOrdersService(user.id);
        res.json(orders);
    }
    catch (err) {
        next(err);
    }
};
exports.getMyOrders = getMyOrders;
const getAllOrders = async (_req, res, next) => {
    try {
        const orders = await orderService.listAllOrdersService();
        res.json(orders);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllOrders = getAllOrders;
