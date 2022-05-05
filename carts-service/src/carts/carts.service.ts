import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { PrismaService } from '../prisma/prisma.service';
import { CartByItemId } from './interfaces/cart-by-item-id.interface';
import { Cart } from './interfaces/cart.interface';
import { CreateItemInCartDto } from './interfaces/create-item-in-cart.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { UpdateCartDto } from './interfaces/update-cart.interface';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  async getCartByUserId(id: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        item: true,
      },
    });
    const countItems = await this.prisma.cart.count({
      where: {
        userId: id,
      },
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
      userId: id,
      itemInCart: items,
      varietyOfItems: countItems,
      totalPrice: totalPrice,
    };
    return result;
  }

  async updateItemInCart(data: UpdateCartDto): Promise<Cart | null> {
    //needs check that quantity is not 0. We're only updating quantity of the item. To delete item we have another function
    if (data.itemId) {
      const updatedCart = await this.prisma.cart.update({
        where: {
          userId_itemId: {
            userId: data.userId,
            itemId: data.itemId,
          },
        },
        data: {
          quantity: data.quantity,
        },
      });
      return this.getCartByUserId(data.userId);
    }
    return null;
  }

  async clearCart(userId: string): Promise<DeleteItemDto> {
    const deletedItems = await this.prisma.cart.deleteMany({
      where: {
        userId,
      },
    });
    return { message: 'Items in cart were deleted!' };
  }

  async removeItemFromCart(data: CartByItemId): Promise<Cart> {
    const deletedItem = await this.prisma.cart.delete({
      where: {
        userId_itemId: {
          itemId: data.itemId,
          userId: data.userId,
        },
      },
    });
    return this.getCartByUserId(data.userId);
  }

  async deleteItem(id: string): Promise<DeleteItemDto> {
    const item = await this.prisma.item.findUnique({
      where: {
        id,
      },
    });

    if (item) {
      const itemInCarts = await this.prisma.cart.findMany({
        where: {
          itemId: id,
        },
      });

      if (itemInCarts) {
        const deletedItems = await this.prisma.cart.deleteMany({
          where: {
            itemId: id,
          },
        });
      }

      const deletedItem = await this.prisma.item.delete({
        where: {
          id,
        },
      });
      return { message: 'The items in all carts were deleted!' };
    }

    return { message: "That item didn't exist in cart database" };
  }

  async addItemInCart(data: CreateItemInCartDto): Promise<Cart | null> {
    if (data.itemId) {
      const item = await this.prisma.cart.upsert({
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
      });
      return this.getCartByUserId(data.userId);
    }
    return null;
  }
}
