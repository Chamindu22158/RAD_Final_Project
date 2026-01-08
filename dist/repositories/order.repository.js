"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllOrders = exports.findOrdersByUser = exports.createOrderRepo = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const createOrderRepo = async (payload) => {
    const order = await Order_1.default.create(payload);
    const populatedOrder = await Order_1.default.findById(order._id).populate('productId');
    return {
        _id: populatedOrder._id,
        userId: populatedOrder.userId,
        productId: populatedOrder.productId,
        category: populatedOrder.category,
        selectedAlcohol: populatedOrder.selectedAlcohol,
        totalAmount: populatedOrder.totalAmount,
        paymentStatus: populatedOrder.paymentStatus,
        transactionId: populatedOrder.transactionId,
        createdAt: populatedOrder.createdAt,
        updatedAt: populatedOrder.updatedAt
    };
};
exports.createOrderRepo = createOrderRepo;
const findOrdersByUser = async (userId) => {
    const orders = await Order_1.default.find({ userId }).populate('productId');
    return orders.map(order => ({
        _id: order._id,
        userId: order.userId,
        productId: order.productId,
        category: order.category,
        selectedAlcohol: order.selectedAlcohol,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        transactionId: order.transactionId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
    }));
};
exports.findOrdersByUser = findOrdersByUser;
const findAllOrders = async () => {
    return Order_1.default.find().populate('productId').populate('userId', 'email username');
};
exports.findAllOrders = findAllOrders;
