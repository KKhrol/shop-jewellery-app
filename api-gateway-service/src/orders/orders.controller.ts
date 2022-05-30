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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../filters/exception.filter';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { ResponseError } from '../common-interfaces/response-error.interface';
import { DeleteItemDto } from '../items/interfaces/deleted-item-output.interface';
import { DeletedOrderOutputDto } from './interfaces/deleted-order-output.interface';
import { OrderInList } from './interfaces/order-in-list.interface';
import { IOrdersService } from './interfaces/order-service.interface';
import { Order } from './interfaces/order.interface';
import { UpdateOrderDto } from './interfaces/update-order.interface';
import { User } from 'src/decorators/user.decorator';

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
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
    @User('userId') userId: string,
  ): Observable<ResponseData<OrderInList[]> | ResponseError> {
    const ordersPerPage = 10;
    const page = Number(numberOfPage);
    const orders = this.ordersService.findOrders({
      userId,
      page,
      ordersPerPage,
      deleted: true,
    });
    return orders;
  }

  @Get(':id')
  getOrder(
    @Param('id') id: string,
  ): Observable<ResponseData<Order> | ResponseError> {
    return this.ordersService.findOrder({ id });
  }

  @Get()
  getOrders(
    @Query('page') numberOfPage: number,
    @User('userId') userId: string,
  ): Observable<ResponseData<OrderInList[]> | ResponseError> {
    const ordersPerPage = 10;
    const page = Number(numberOfPage);
    const orders = this.ordersService.findOrders({
      userId,
      page,
      ordersPerPage,
      deleted: false,
    });
    return orders;
  }

  @Put(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Observable<ResponseData<Order> | ResponseError> {
    updateOrderDto.orderId = id;
    return this.ordersService.updateOrder(updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(
    @Param('id') id: string,
  ): Observable<ResponseData<DeletedOrderOutputDto> | ResponseError> {
    return this.ordersService.deleteOrder({ id });
  }

  @Delete(':id/items/:itemId')
  deleteItem(
    @Param('id') orderId: string,
    @Param('itemId') itemId: string,
  ): Observable<ResponseData<DeleteItemDto> | ResponseError> {
    return this.ordersService.deleteItem({ orderId, itemId });
  }
}
