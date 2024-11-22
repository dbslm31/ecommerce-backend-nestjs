import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/models/orders.model';
import { User } from 'src/user/user.model';

@Injectable()
export class OrderRepository {
    constructor(@InjectModel(Order) private readonly orderModel: typeof Order) { }


    async create(orderData: Partial<Order>, userId: number): Promise<Order> {
        const newOrder = await this.orderModel.create({
            ...orderData,
            userId,
        });

        return this.orderModel.findOne({
            where: { id: newOrder.id },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        });
    }


    async findById(orderId: number): Promise<Order> {
        return this.orderModel.findOne({
            where: { id: orderId },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        });
    }

    async findByUserId(userId: number): Promise<Order[]> {
        return this.orderModel.findAll({
            where: { userId },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        });
    }



    async findAll(): Promise<Order[]> {
        return this.orderModel.findAll({
            include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        });
    }

    async update(id: number, data: Partial<Order>): Promise<void> {
        await this.orderModel.update(data, { where: { id } });
    }

    async delete(id: number): Promise<void> {
        const order = await this.findById(id);
        if (order) {
            await order.destroy();
        }
    }
}
