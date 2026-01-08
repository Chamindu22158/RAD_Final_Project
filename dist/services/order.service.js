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
exports.listAllOrdersService = exports.listUserOrdersService = exports.createOrderService = void 0;
const orderRepo = __importStar(require("../repositories/order.repository"));
const transaction_1 = require("../utils/transaction");
const createOrderService = async (payload) => {
    // in production you would run payment here
    const transactionId = (0, transaction_1.generateTransactionId)();
    const order = await orderRepo.createOrderRepo({ ...payload, paymentStatus: 'success', transactionId });
    return order;
};
exports.createOrderService = createOrderService;
const listUserOrdersService = async (userId) => {
    const orders = await orderRepo.findOrdersByUser(userId);
    // Group orders by date (assuming orders on the same day are part of the same "cart")
    const groupedOrders = {};
    orders.forEach(order => {
        const dateKey = order.createdAt.toISOString().split('T')[0]; // Group by date
        if (!groupedOrders[dateKey]) {
            groupedOrders[dateKey] = [];
        }
        groupedOrders[dateKey].push(order);
    });
    // Transform to frontend expected format
    return Object.entries(groupedOrders).map(([dateKey, orderGroup]) => {
        const items = orderGroup.map(order => ({
            productId: order.productId._id.toString(),
            name: order.productId.name,
            quantity: 1, // Assuming 1 quantity per order
            price: order.totalAmount
        }));
        const total = items.reduce((sum, item) => sum + item.price, 0);
        return {
            id: orderGroup[0]._id.toString(), // Use first order's ID as the order ID
            userId: userId,
            items: items,
            total: total,
            status: orderGroup[0].paymentStatus === 'success' ? 'confirmed' : 'pending',
            createdAt: orderGroup[0].createdAt.toISOString()
        };
    });
};
exports.listUserOrdersService = listUserOrdersService;
const listAllOrdersService = async () => {
    return orderRepo.findAllOrders();
};
exports.listAllOrdersService = listAllOrdersService;
