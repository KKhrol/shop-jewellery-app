import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, toArray } from 'rxjs';
import { DeleteItemDto } from '../items/interfaces/deleted-item-output.interface';
import { DeletedOrderOutputDto } from './interfaces/deleted-order-output.interface';
import { GetOrderByIdDto } from './interfaces/get-order-by-id.interface';
import { OrderInList } from './interfaces/order-in-list.interface';
import { IOrdersService } from './interfaces/order-service.interface';
import { Order } from './interfaces/order.interface';
import { UpdateOrderDto } from './interfaces/update-order.interface';

@Controller('orders')
export class OrdersController implements OnModuleInit {
  constructor(@Inject('ORDER_PACKAGE') private readonly client: ClientGrpc) {}
  private ordersService: IOrdersService;
  onModuleInit() {
    this.ordersService =
      this.client.getService<IOrdersService>('OrdersController');
  }

  @Get('deleted')
  getDeletedOrders(
    @Query('page') numberOfPage: number,
    @Body() orderById: GetOrderByIdDto,
  ): Observable<OrderInList[]> {
    const ordersPerPage = 10;
    const page = Number(numberOfPage);
    const stream = this.ordersService.findOrders({
      userId: orderById.id,
      page,
      ordersPerPage,
      deleted: true,
    });
    return stream.pipe(toArray());
  }

  @Get(':id')
  getOrder(@Param('id') id: string): Observable<Order> {
    return this.ordersService.findOrder({ id });
  }

  @Get()
  getOrders(
    @Query('page') numberOfPage: number,
    @Body() orderById: GetOrderByIdDto,
  ): Observable<OrderInList[]> {
    const ordersPerPage = 10;
    const page = Number(numberOfPage);
    const stream = this.ordersService.findOrders({
      userId: orderById.id,
      page,
      ordersPerPage,
      deleted: false,
    });
    return stream.pipe(toArray());
  }

  @Put(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Observable<Order> {
    updateOrderDto.orderId = id;
    return this.ordersService.updateOrder(updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Observable<DeletedOrderOutputDto> {
    return this.ordersService.deleteOrder({ id });
  }

  @Delete(':id/items/:itemId')
  deleteItem(
    @Param('id') orderId: string,
    @Param('itemId') itemId: string,
  ): Observable<DeleteItemDto> {
    return this.ordersService.deleteItem({ orderId, itemId });
  }
}
