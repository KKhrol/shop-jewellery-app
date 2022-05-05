import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { CartById } from './interfaces/cart-by-id.interface';
import { CartByItemId } from './interfaces/cart-by-item-id.interface';
import { CartByUserId } from './interfaces/cart-by-user-id.interface';
import { Cart } from './interfaces/cart.interface';
import { CreateItemInCartDto } from './interfaces/create-item-in-cart.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { UpdateCartDto } from './interfaces/update-cart.interface';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}
  @GrpcMethod('CartsController', 'FindOne')
  async findOne(data: CartByUserId): Promise<Cart> {
    return this.cartsService.getCartByUserId(data.id);
  }

  @GrpcMethod('CartsController', 'UpdateOne')
  async updateOne(updateCartDto: UpdateCartDto): Promise<Cart> {
    return this.cartsService.updateItemInCart(updateCartDto);
  }

  @GrpcMethod('CartsController', 'DeleteItemFromCart')
  async deleteItemFromCart(cartByItemId: CartByItemId): Promise<Cart> {
    return this.cartsService.removeItemFromCart(cartByItemId);
  }

  @GrpcMethod('CartsController', 'ClearCart')
  async clearCart(data: CartByUserId): Promise<DeleteItemDto> {
    return this.cartsService.clearCart(data.id);
  }

  @GrpcMethod('CartsController', 'DeleteOneItem')
  async deleteOneItem(data: CartById): Promise<DeleteItemDto> {
    return this.cartsService.deleteItem(data.id);
  }

  @GrpcMethod('CartsController', 'AddItem')
  async addItem(createItemInCart: CreateItemInCartDto): Promise<Cart> {
    return this.cartsService.addItemInCart(createItemInCart);
  }
}
