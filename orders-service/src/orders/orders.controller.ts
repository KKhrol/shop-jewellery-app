import { Controller } from '@nestjs/common';
import { OrderById } from './interfaces/order-by-id.interface';
import { Order } from './interfaces/order.interface';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  @GrpcMethod('OrdersService', 'FindOne')
  findOne(data: OrderById): Order {
    const orders = [
      {
        orderId: '1a',
        userId: '1a',
        summary: 23.56,
        itemInOrder: [
          {
            itemId: '1a',
            quantity: 2,
          },
        ],
      },
      {
        orderId: '2a',
        userId: '1a',
        summary: 3456.2,
        itemInOrder: [
          {
            itemId: '1a',
            quantity: 2,
          },
          {
            itemId: '2b',
            quantity: 1,
          },
          {
            itemId: '3c',
            quantity: 1,
          },
        ],
      },
    ];
    return orders.find(({ orderId }) => orderId === data.id);
  }
}
