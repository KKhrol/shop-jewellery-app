import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { DeleteItemDto } from '../items/interfaces/deleted-item-output.interface';
import { CartByItemId } from './interfaces/cart-by-item-id.interface';
import { CartByUserId } from './interfaces/cart-by-user-id.interface';
import { ICartsService } from './interfaces/cart-service.interface';
import { Cart } from './interfaces/cart.interface';
import { UpdateCartDto } from './interfaces/update-cart.interface';

@Controller('carts')
export class CartsController implements OnModuleInit {
  constructor(@Inject('CART_PACKAGE') private readonly client: ClientGrpc) {}
  private cartsService: ICartsService;
  onModuleInit() {
    this.cartsService =
      this.client.getService<ICartsService>('CartsController');
  }

  @Get()
  getItemsInCart(@Body() data: CartByUserId): Observable<Cart> {
    return this.cartsService.findOne(data);
  }

  @Put(':id')
  updateItemInCart(
    @Param('id') itemId: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Observable<Cart> {
    updateCartDto.itemId = itemId;
    return this.cartsService.updateOne(updateCartDto);
  }

  @Delete()
  clearCart(@Body() data: CartByUserId): Observable<DeleteItemDto> {
    return this.cartsService.clearCart(data);
  }

  @Delete(':id')
  removeItemFromCart(
    @Param('id') itemId: string,
    @Body() data: CartByUserId,
  ): Observable<DeleteItemDto> {
    const cartByItemId: CartByItemId = {
      userId: data.id,
      itemId,
    };
    return this.cartsService.deleteItemFromCart(cartByItemId);
  }
}
