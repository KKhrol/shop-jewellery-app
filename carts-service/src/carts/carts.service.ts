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
  async getCartByUserId(id: string): Promise<Cart> {
    const cart = await this.prisma.cart
      .findMany({
        where: {
          userId: id,
        },
        include: {
          item: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!cart) {
      throw new RpcException('No carts were found.');
    }
    const countItems = await this.prisma.cart
      .count({
        where: {
          userId: id,
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
      userId: id,
      itemInCart: items,
      varietyOfItems: countItems,
      totalPrice: totalPrice,
    };
    return result;
  }

  async updateCart(data: UpdateCartDto): Promise<Cart> {
    if (data.quantity === 0) {
      throw new RpcException('Quantity of the item should be > 0');
    }
    if (!data.itemId) {
      throw new RpcException("The itemId wasn't provided.");
    }
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
      throw new RpcException("The cart wasn't updated.");
    }
    return this.getCartByUserId(data.userId);
  }

  async clearCart(userId: string): Promise<DeleteItemDto> {
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
      throw new RpcException("The cart wasn't cleared.");
    }
    return { message: 'Items in cart were deleted!' };
  }

  async removeItemFromCart(data: CartByItemId): Promise<Cart | null> {
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
      throw new RpcException("The item wasn't removed from cart.");
    }
    return this.getCartByUserId(data.userId);
  }

  async deleteItem(id: string): Promise<DeleteItemDto> {
    const item = await this.prisma.item
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!item) {
      throw new RpcException(
        "The item wasn't deleted, because it didn't exist.",
      );
    }
    const itemInCarts = await this.prisma.cart
      .findMany({
        where: {
          itemId: id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (itemInCarts) {
      const deletedItems = await this.prisma.cart
        .deleteMany({
          where: {
            itemId: id,
          },
        })
        .catch((error) => {
          throw new RpcException(error);
        });
      if (!deletedItems) {
        throw new RpcException("The item wasn't deleted from carts.");
      }
    }

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
      throw new RpcException("The item wasn't deleted");
    }
    return { message: 'The items in all carts were deleted!' };
  }

  async addItem(data: AddItemInCartDto): Promise<Cart> {
    if (!data.itemId) {
      throw new RpcException("The itemId wasn't provided.");
    }
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
      throw new RpcException("The item wasn't added.");
    }
    return this.getCartByUserId(data.userId);
  }

  async updateItem(data: UpdateItemDto): Promise<ItemInCart> {
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
      throw new RpcException("The item wasn't updated.");
    }
    return upsertedItem;
  }

  async createItem(data: CreateItemDto): Promise<ItemInCart> {
    const createdItem = await this.prisma.item
      .create({
        data: data,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!createdItem) {
      throw new RpcException("The item wasn't created.");
    }
    return createdItem;
  }
}
