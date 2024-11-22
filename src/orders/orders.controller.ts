import { Body, Controller, Delete, Get, Param, Patch, Post, Query, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './orders.service';
import { Order } from 'src/models/orders.model';
import { OrderStatus } from 'src/models/orders.model';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async createOrder(
        @Body() orderData: { name: string; description: string; status?: OrderStatus },
        @Query('userId') userId: number,
    ): Promise<Order> {
        if (!userId) {
            throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
        }

        return this.orderService.createOrder(orderData, userId);
    }

    @Get(':id')
    async getOrderById(@Param('id') id: number): Promise<Order> {
        try {
            return await this.orderService.getOrderById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async getAllOrders(): Promise<Order[]> {
        return this.orderService.getAllOrders();
    }

    @Get('/user/:userId')
    async getOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
        return this.orderService.getOrdersByUserId(userId);
    }

    @Patch(':id')
    async updateOrder(
        @Param('id') id: number,
        @Body() updateData: Partial<{ name: string; description: string; status: OrderStatus }>,
    ): Promise<void> {
        try {
            await this.orderService.updateOrder(id, updateData);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: number): Promise<void> {
        try {
            await this.orderService.deleteOrder(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
