import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { CartById } from './interfaces/cart-by-id.interface';
import { CartByItemId } from './interfaces/cart-by-item-id.interface';
import { CartByUserId } from './interfaces/cart-by-user-id.interface';
import { Cart } from './interfaces/cart.interface';
import { AddItemInCartDto } from './interfaces/add-item-in-cart.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { UpdateCartDto } from './interfaces/update-cart.interface';
import { UpdateItemDto } from './interfaces/update-item-in-cart.interface';
import { ItemInCart } from './interfaces/item-in-cart.interface';
import { CreateItemDto } from './interfaces/create-item-in-cart.interface';
import { ResponseData } from './interfaces/response-data.interface';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}
  @GrpcMethod('CartsController', 'FindCart')
  async findCart(data: CartByUserId): Promise<ResponseData<Cart>> {
    return {
      status: 'success',
      message: 'The cart was found.',
      data: await this.cartsService.getCartByUserId(data.id),
    };
  }

  @GrpcMethod('CartsController', 'UpdateCart')
  async updateCart(updateCartDto: UpdateCartDto): Promise<ResponseData<Cart>> {
    return {
      status: 'success',
      message: 'The cart was updated.',
      data: await this.cartsService.updateCart(updateCartDto),
    };
  }

  @GrpcMethod('CartsController', 'DeleteItemFromCart')
  async deleteItemFromCart(
    cartByItemId: CartByItemId,
  ): Promise<ResponseData<Cart>> {
    return {
      status: 'success',
      message: 'The item was deleted from cart.',
      data: await this.cartsService.removeItemFromCart(cartByItemId),
    };
  }

  @GrpcMethod('CartsController', 'ClearCart')
  async clearCart(data: CartByUserId): Promise<ResponseData<DeleteItemDto>> {
    return {
      status: 'success',
      message: 'The cart was cleared.',
      data: await this.cartsService.clearCart(data.id),
    };
  }

  @GrpcMethod('CartsController', 'DeleteItem')
  async deleteItem(data: CartById): Promise<ResponseData<DeleteItemDto>> {
    return {
      status: 'success',
      message: 'The item was deleted.',
      data: await this.cartsService.deleteItem(data.id),
    };
  }

  @GrpcMethod('CartsController', 'AddItem')
  async addItem(addItemInCart: AddItemInCartDto): Promise<ResponseData<Cart>> {
    return {
      status: 'success',
      message: 'The item was added to cart.',
      data: await this.cartsService.addItem(addItemInCart),
    };
  }

  @GrpcMethod('CartsController', 'UpdateItem')
  async updateItem(
    updateItemDto: UpdateItemDto,
  ): Promise<ResponseData<ItemInCart>> {
    return {
      status: 'success',
      message: 'The ites was updated.',
      data: await this.cartsService.updateItem(updateItemDto),
    };
  }

  @GrpcMethod('CartsController', 'CreateItem')
  async createItem(
    createItemDto: CreateItemDto,
  ): Promise<ResponseData<ItemInCart>> {
    return {
      status: 'success',
      message: 'The item was created.',
      data: await this.cartsService.createItem(createItemDto),
    };
  }
}
