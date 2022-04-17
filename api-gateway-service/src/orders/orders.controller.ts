import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IOrdersService } from './interfaces/order-service.interface';
import { Order } from './interfaces/order.interface';

@Controller('orders')
export class OrdersController implements OnModuleInit {
  constructor(@Inject('ORDER_PACKAGE') private readonly client: ClientGrpc) {}
  private ordersService: IOrdersService;
  onModuleInit() {
    this.ordersService =
      this.client.getService<IOrdersService>('OrdersService');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Order> {
    return this.ordersService.findOne({ id });
  }
}
