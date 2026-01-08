import * as orderRepo from '../repositories/order.repository';
import { IOrder } from '../models/Order';
import { generateTransactionId } from '../utils/transaction';

export const createOrderService = async (payload: Partial<IOrder>) => {
    // in production you would run payment here
    const transactionId = generateTransactionId();
    const order = await orderRepo.createOrderRepo({ ...payload, paymentStatus: 'success', transactionId });
    return order;
};

export const listUserOrdersService = async (userId: string) => {
    const orders = await orderRepo.findOrdersByUser(userId);
    
    // Group orders by date (assuming orders on the same day are part of the same "cart")
    const groupedOrders: { [key: string]: any[] } = {};
    
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

export const listAllOrdersService = async () => {
    return orderRepo.findAllOrders();
};
