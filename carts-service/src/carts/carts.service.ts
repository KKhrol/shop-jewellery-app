import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartByItemId } from './interfaces/cart-by-item-id.interface';
import { Cart } from './interfaces/cart.interface';
import { AddItemInCartDto } from './interfaces/add-item-in-cart.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { UpdateCartDto } from './interfaces/update-cart.interface';
import { UpdateItemDto } from './interfaces/update-item-in-cart.interface';
import { ItemInCart } from './interfaces/item-in-cart.interface';
import { CreateItemDto } from './interfaces/create-item-in-cart.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  async getCartByUserId(userId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart
      .findMany({
        where: {
          userId,
        },
        include: {
          item: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!cart) {
      return null;
    }
    const countItems = await this.prisma.cart
      .count({
        where: {
          userId,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    const items = [];

    let i = 0;
    let totalPrice = 0;
    cart.forEach(function (data) {
      items[i] = data.item;
      items[i].quantity = data.quantity;
      totalPrice += data.quantity * data.item.price;
      i++;
    });
    const result = {
      userId,
      itemInCart: items,
      varietyOfItems: countItems,
      totalPrice: totalPrice,
    };
    return result;
  }

  async updateCart(data: UpdateCartDto): Promise<string | null> {
    const updatedCart = await this.prisma.cart
      .update({
        where: {
          userId_itemId: {
            userId: data.userId,
            itemId: data.itemId,
          },
        },
        data: {
          quantity: data.quantity,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!updatedCart) {
      return null;
    }
    return data.userId;
  }

  async clearCart(userId: string): Promise<DeleteItemDto | null> {
    const deletedItems = await this.prisma.cart
      .deleteMany({
        where: {
          userId,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!deletedItems) {
      return null;
    }

    return { message: 'Items in cart were deleted!' };
  }

  async removeItemFromCart(data: CartByItemId): Promise<string | null> {
    const deletedItem = await this.prisma.cart
      .delete({
        where: {
          userId_itemId: {
            itemId: data.itemId,
            userId: data.userId,
          },
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!deletedItem) {
      return null;
    }
    return deletedItem.userId;
  }

  async deleteItem(id: string): Promise<DeleteItemDto | null> {
    const deletedItem = await this.prisma.item
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!deletedItem) {
      return null;
    }
    return { message: 'The items in all carts were deleted!' };
  }

  async addItem(data: AddItemInCartDto): Promise<string | null> {
    const item = await this.prisma.cart
      .upsert({
        where: {
          userId_itemId: {
            userId: data.userId,
            itemId: data.itemId,
          },
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
        create: {
          userId: data.userId,
          quantity: 1,
          item: {
            connectOrCreate: {
              where: {
                id: data.itemId,
              },
              create: {
                id: data.itemId,
                image: data.image,
                itemName: data.itemName,
                description: data.description,
                metalImage: data.metalImage,
                price: data.price,
              },
            },
          },
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!item) {
      return null;
    }
    return data.userId;
  }

  async updateItem(data: UpdateItemDto): Promise<ItemInCart | null> {
    const upsertedItem = await this.prisma.item
      .upsert({
        where: {
          id: data.id,
        },
        update: {
          image: data.image,
          itemName: data.itemName,
          description: data.description,
          metalImage: data.metalImage,
          price: data.price,
        },
        create: {
          id: data.id,
          image: data.image,
          itemName: data.itemName,
          description: data.description,
          metalImage: data.metalImage,
          price: data.price,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!upsertedItem) {
      return null;
    }
    return upsertedItem;
  }

  async createItem(data: CreateItemDto): Promise<ItemInCart | null> {
    const createdItem = await this.prisma.item
      .create({
        data: data,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!createdItem) {
      return null;
    }
    return createdItem;
  }
}
