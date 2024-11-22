import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/models/orders.model';
import { OrderRepository } from './orders.repository';
import { Order } from 'src/models/orders.model';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) { }


    async createOrder(
        orderData: { name: string; description: string; status?: OrderStatus },
        userId: number,
    ): Promise<Order> {
        return this.orderRepository.create(orderData, userId);
    }


    async getOrderById(orderId: number): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }

    async getOrdersByUserId(userId: number): Promise<Order[]> {
        return this.orderRepository.findByUserId(userId);
    }


    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.findAll();
    }


    async updateOrder(id: number, data: Partial<Order>): Promise<void> {
        const order = await this.getOrderById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        await this.orderRepository.update(id, data);
    }


    async deleteOrder(id: number): Promise<void> {
        const order = await this.getOrderById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        await this.orderRepository.delete(id);
    }
}
