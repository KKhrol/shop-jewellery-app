import { Controller } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { GrpcMethod } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './interfaces/create-order.interface';
import { Observable } from 'rxjs';
import { OrderInList } from './interfaces/order-in-list.interface';
import { UpdateOrderDto } from './interfaces/update-order.interface';
import { DeleteItemInOrderDto } from './interfaces/delete-item-in-order.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { DeleteOrderDto } from './interfaces/delete-order.interface';
import { DeletedOrderOutputDto } from './interfaces/deleted-order-output.interface';
import { GetOrdersDto } from './interfaces/get-orders.interface';
import { GetOrderByIdDto } from './interfaces/get-order-by-id.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @GrpcMethod('OrdersController', 'FindOrder')
  async findOrder(data: GetOrderByIdDto): Promise<Order> {
    return this.ordersService.getOrderById(data.id);
  }

  @GrpcMethod('OrdersController', 'CreateOrder')
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @GrpcMethod('OrdersController', 'FindOrders')
  async findOrders(
    getOrdersDto: GetOrdersDto,
  ): Promise<Observable<OrderInList>> {
    return this.ordersService.getOrders(getOrdersDto);
  }

  @GrpcMethod('OrdersController', 'UpdateOrder')
  async updateOne(updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(updateOrderDto);
  }

  @GrpcMethod('OrdersController', 'DeleteItem')
  async deleteItem(
    deleteItemInOrderDto: DeleteItemInOrderDto,
  ): Promise<DeleteItemDto> {
    return this.ordersService.deleteItem(deleteItemInOrderDto);
  }

  @GrpcMethod('OrdersController', 'DeleteOrder')
  async deleteOrder(data: DeleteOrderDto): Promise<DeletedOrderOutputDto> {
    return this.ordersService.deleteOrder(data.id);
  }
}
