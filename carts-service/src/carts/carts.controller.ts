import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
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
    const cart = await this.cartsService.getCartByUserId(data.id);

    if (!cart) {
      throw new RpcException('No carts were found!');
    }
    return {
      status: 'success',
      message: 'The cart was found.',
      data: cart,
    };
  }

  @GrpcMethod('CartsController', 'UpdateCart')
  async updateCart(updateCartDto: UpdateCartDto): Promise<ResponseData<Cart>> {
    if (updateCartDto.quantity === 0) {
      throw new RpcException('Quantity of the item should be > 0');
    }
    if (!updateCartDto.itemId) {
      throw new RpcException("The itemId wasn't provided.");
    }

    const userId = await this.cartsService.updateCart(updateCartDto);

    if (!userId) {
      throw new RpcException("The cart wasn't updated.");
    }

    const updatedCart = await this.cartsService.getCartByUserId(userId);

    if (!updatedCart) {
      throw new RpcException('No carts were found.');
    }

    return {
      status: 'success',
      message: 'The cart was updated.',
      data: updatedCart,
    };
  }

  @GrpcMethod('CartsController', 'DeleteItemFromCart')
  async deleteItemFromCart(
    cartByItemId: CartByItemId,
  ): Promise<ResponseData<Cart>> {
    const deletedItem = await this.cartsService.removeItemFromCart(
      cartByItemId,
    );
    if (!deletedItem) {
      throw new RpcException("The item wasn't removed from cart.");
    }

    const updatedCart = await this.cartsService.getCartByUserId(deletedItem);

    if (!updatedCart) {
      throw new RpcException('No carts were found.');
    }

    return {
      status: 'success',
      message: 'The item was deleted from cart.',
      data: updatedCart,
    };
  }

  @GrpcMethod('CartsController', 'ClearCart')
  async clearCart(data: CartByUserId): Promise<ResponseData<DeleteItemDto>> {
    const deletedItems = await this.cartsService.clearCart(data.id);

    if (!deletedItems) {
      throw new RpcException("The cart wasn't cleared.");
    }

    return {
      status: 'success',
      message: 'The cart was cleared.',
      data: deletedItems,
    };
  }

  @GrpcMethod('CartsController', 'DeleteItem')
  async deleteItem(data: CartById): Promise<ResponseData<DeleteItemDto>> {
    const deletedItem = await this.cartsService.deleteItem(data.id);

    if (!deletedItem) {
      throw new RpcException("The item wasn't deleted");
    }

    return {
      status: 'success',
      message: 'The item was deleted.',
      data: deletedItem,
    };
  }

  @GrpcMethod('CartsController', 'AddItem')
  async addItem(addItemInCart: AddItemInCartDto): Promise<ResponseData<Cart>> {
    if (!addItemInCart.itemId) {
      throw new RpcException("The itemId wasn't provided.");
    }

    const userId = await this.cartsService.addItem(addItemInCart);

    if (!userId) {
      throw new RpcException("The item wasn't added.");
    }

    const updatedCart = await this.cartsService.getCartByUserId(userId);

    if (!updatedCart) {
      throw new RpcException('No carts were found.');
    }

    return {
      status: 'success',
      message: 'The item was added to cart.',
      data: updatedCart,
    };
  }

  @GrpcMethod('CartsController', 'UpdateItem')
  async updateItem(
    updateItemDto: UpdateItemDto,
  ): Promise<ResponseData<ItemInCart>> {
    const updatedItem = await this.cartsService.updateItem(updateItemDto);

    if (!updatedItem) {
      throw new RpcException("The item wasn't updated.");
    }

    return {
      status: 'success',
      message: 'The ites was updated.',
      data: updatedItem,
    };
  }

  @GrpcMethod('CartsController', 'CreateItem')
  async createItem(
    createItemDto: CreateItemDto,
  ): Promise<ResponseData<ItemInCart>> {
    const createdItem = await this.cartsService.createItem(createItemDto);

    if (!createdItem) {
      throw new RpcException("The item wasn't created.");
    }
    return {
      status: 'success',
      message: 'The item was created.',
      data: createdItem,
    };
  }
}
