import { Controller } from '@nestjs/common';
import { Order } from './dto/order.dto';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderInList } from './dto/order-in-list.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DeleteItemInOrderDto } from './dto/delete-item-in-order.dto';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { DeleteOrderDto } from './dto/delete-order.dto';
import { DeletedOrderOutputDto } from './dto/deleted-order-output.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { GetOrderByIdDto } from './dto/get-order-by-id.dto';
import { ResponseData } from './dto/response-data.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @GrpcMethod('OrdersController', 'FindOrder')
  async findOrder(data: GetOrderByIdDto): Promise<ResponseData<Order>> {
    const order = await this.ordersService.getOrderById(data.id);
    if (!order) {
      throw new RpcException("The order wasn't found");
    }
    return {
      status: 'success',
      message: 'Order found.',
      data: order,
    };
  }

  @GrpcMethod('OrdersController', 'CreateOrder')
  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<ResponseData<Order>> {
    const orderCreated = await this.ordersService.createOrder(createOrderDto);
    if (!orderCreated) {
      throw new RpcException("The order wasn't created");
    }
    return {
      status: 'success',
      message: 'Order created.',
      data: orderCreated,
    };
  }

  @GrpcMethod('OrdersController', 'FindOrders')
  async findOrders(
    getOrdersDto: GetOrdersDto,
  ): Promise<ResponseData<OrderInList[]>> {
    const orders = await this.ordersService.getOrders(getOrdersDto);
    if (!orders) {
      throw new RpcException('No orders were found.');
    }
    return {
      status: 'success',
      message: 'Orders found.',
      data: orders,
    };
  }

  @GrpcMethod('OrdersController', 'UpdateOrder')
  async updateOrder(
    updateOrderDto: UpdateOrderDto,
  ): Promise<ResponseData<Order>> {
    if (!updateOrderDto.orderId) {
      throw new RpcException("The orderId wasn't provided");
    }
    if (updateOrderDto.discount < 0 || updateOrderDto.discount > 100) {
      throw new RpcException('Invalid value of discount.');
    }

    const orderUpdated = await this.ordersService.updateOrder(updateOrderDto);

    if (!orderUpdated) {
      throw new RpcException("The order wasn't updated.");
    }

    const order = await this.ordersService.getOrderById(orderUpdated.id);
    if (!order) {
      throw new RpcException("The order wasn't found");
    }
    return {
      status: 'success',
      message: 'Order updated.',
      data: order,
    };
  }

  @GrpcMethod('OrdersController', 'DeleteItem')
  async deleteItem(
    deleteItemInOrderDto: DeleteItemInOrderDto,
  ): Promise<ResponseData<DeleteItemDto>> {
    const orderId = deleteItemInOrderDto.orderId;

    const itemDeleted = await this.ordersService.deleteItem(
      deleteItemInOrderDto,
    );
    if (!itemDeleted) {
      throw new RpcException("The item in order wasn't deleted.");
    }
    let response = { message: 'Item was deleted' };

    const totalPrice = await this.ordersService.getOrderTotalPrice(orderId);
    if (!totalPrice) {
      const orderDeleted = await this.ordersService.deleteOrder(orderId);

      if (!orderDeleted) {
        throw new RpcException("The order wasn't deleted.");
      }
      response = { message: 'Item and order were deleted' };
    } else {
      const orderUpdated = await this.ordersService.updateOrder({
        orderId: orderId,
        discount: 0,
        oldTotalPrice: totalPrice,
      });

      if (!orderUpdated) {
        throw new RpcException("The total price in order wasn't updated.");
      }
    }

    return {
      status: 'success',
      message: 'Item deleted from order.',
      data: response,
    };
  }

  @GrpcMethod('OrdersController', 'DeleteOrder')
  async deleteOrder(
    data: DeleteOrderDto,
  ): Promise<ResponseData<DeletedOrderOutputDto>> {
    const orderDeleted = await this.ordersService.deleteOrder(data.id);
    if (!orderDeleted) {
      throw new RpcException("The order wasn't deleted");
    }
    return {
      status: 'success',
      message: 'Item deleted from order.',
      data: orderDeleted,
    };
  }
}
