import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { OrderRepository } from './orders.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository]
})
export class OrdersModule { }
