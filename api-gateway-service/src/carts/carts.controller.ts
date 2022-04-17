import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ICartsService } from './interfaces/cart-service.interface';
import { Cart } from './interfaces/cart.interface';

@Controller('carts')
export class CartsController implements OnModuleInit {
  constructor(@Inject('CART_PACKAGE') private readonly client: ClientGrpc) {}
  private cartsService: ICartsService;
  onModuleInit() {
    this.cartsService = this.client.getService<ICartsService>('CartsService');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Cart> {
    return this.cartsService.findOne({ id });
  }
}
