import { Controller } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { GrpcMethod } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './interfaces/create-order.interface';
import { OrderInList } from './interfaces/order-in-list.interface';
import { UpdateOrderDto } from './interfaces/update-order.interface';
import { DeleteItemInOrderDto } from './interfaces/delete-item-in-order.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { DeleteOrderDto } from './interfaces/delete-order.interface';
import { DeletedOrderOutputDto } from './interfaces/deleted-order-output.interface';
import { GetOrdersDto } from './interfaces/get-orders.interface';
import { GetOrderByIdDto } from './interfaces/get-order-by-id.interface';
import { ResponseData } from './interfaces/response-data.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @GrpcMethod('OrdersController', 'FindOrder')
  async findOrder(data: GetOrderByIdDto): Promise<ResponseData<Order>> {
    return {
      status: 'success',
      message: 'Order found.',
      data: await this.ordersService.getOrderById(data.id),
    };
  }

  @GrpcMethod('OrdersController', 'CreateOrder')
  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<ResponseData<Order>> {
    return {
      status: 'success',
      message: 'Order created.',
      data: await this.ordersService.createOrder(createOrderDto),
    };
  }

  @GrpcMethod('OrdersController', 'FindOrders')
  async findOrders(
    getOrdersDto: GetOrdersDto,
  ): Promise<ResponseData<OrderInList[]>> {
    return {
      status: 'success',
      message: 'Orders found.',
      data: await this.ordersService.getOrders(getOrdersDto),
    };
  }

  @GrpcMethod('OrdersController', 'UpdateOrder')
  async updateOne(
    updateOrderDto: UpdateOrderDto,
  ): Promise<ResponseData<Order>> {
    return {
      status: 'success',
      message: 'Order updated.',
      data: await this.ordersService.updateOrder(updateOrderDto),
    };
  }

  @GrpcMethod('OrdersController', 'DeleteItem')
  async deleteItem(
    deleteItemInOrderDto: DeleteItemInOrderDto,
  ): Promise<ResponseData<DeleteItemDto>> {
    return {
      status: 'success',
      message: 'Item deleted from order.',
      data: await this.ordersService.deleteItem(deleteItemInOrderDto),
    };
  }

  @GrpcMethod('OrdersController', 'DeleteOrder')
  async deleteOrder(
    data: DeleteOrderDto,
  ): Promise<ResponseData<DeletedOrderOutputDto>> {
    return {
      status: 'success',
      message: 'Item deleted from order.',
      data: await this.ordersService.deleteOrder(data.id),
    };
  }
}
