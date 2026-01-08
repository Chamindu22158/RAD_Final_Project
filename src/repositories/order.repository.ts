import Order, { IOrder } from '../models/Order';
import mongoose from 'mongoose';

export const createOrderRepo = async (payload: Partial<IOrder>) => {
    const order = await Order.create(payload);
    const populatedOrder = await Order.findById(order._id).populate('productId');
    return {
        _id: populatedOrder!._id,
        userId: populatedOrder!.userId,
        productId: populatedOrder!.productId,
        category: populatedOrder!.category,
        selectedAlcohol: populatedOrder!.selectedAlcohol,
        totalAmount: populatedOrder!.totalAmount,
        paymentStatus: populatedOrder!.paymentStatus,
        transactionId: populatedOrder!.transactionId,
        createdAt: populatedOrder!.createdAt,
        updatedAt: populatedOrder!.updatedAt
    };
};

export const findOrdersByUser = async (userId: string | mongoose.Types.ObjectId) => {
    const orders = await Order.find({ userId }).populate('productId');
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

export const findAllOrders = async () => {
    return Order.find().populate('productId').populate('userId', 'email username');
};
