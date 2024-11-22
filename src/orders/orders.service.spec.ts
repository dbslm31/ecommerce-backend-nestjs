import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Order } from 'src/models/orders.model';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) { }

  async createOrder(orderData: Partial<Order>, userId: number): Promise<Order> {
    return this.orderRepository.create(orderData, userId);
  }

  async getOrderById(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async updateOrder(orderId: number, updateData: Partial<Order>): Promise<void> {
    const order = await this.getOrderById(orderId);
    await this.orderRepository.update(order.id, updateData);
  }

  async deleteOrder(orderId: number): Promise<void> {
    const order = await this.getOrderById(orderId);
    await this.orderRepository.delete(order.id);
  }
}
