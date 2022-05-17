import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './interfaces/create-order.interface';
import { DeleteItemInOrderDto } from './interfaces/delete-item-in-order.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { DeletedOrderOutputDto } from './interfaces/deleted-order-output.interface';
import { GetOrdersDto } from './interfaces/get-orders.interface';
import { OrderInList } from './interfaces/order-in-list.interface';
import { Order } from './interfaces/order.interface';
import { UpdateOrderDto } from './interfaces/update-order.interface';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async getOrderById(id: string): Promise<Order> {
    console.log(id);
    const order = await this.prisma.order
      .findUnique({
        where: {
          id,
        },
        include: {
          items: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!order) {
      throw new RpcException("The order wasn't found");
    }

    const varietyOfItems = await this.prisma.item
      .count({
        where: {
          orderId: id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    const result = {
      orderId: order.id,
      userId: order.userId,
      varietyOfItems: varietyOfItems,
      totalPrice: order.totalPrice,
      itemInOrder: order.items,
      createdAt: order.createdAt.toUTCString(),
      updatedAt: order.updatedAt.toUTCString(),
    };
    return result;
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    console.log(data.itemInOrder);
    const orderCreated = await this.prisma.order
      .create({
        data: {
          totalPrice: data.totalPrice,
          userId: data.userId,
          items: {
            createMany: {
              data: data.itemInOrder,
            },
          },
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!orderCreated) {
      throw new RpcException("The order wasn't created");
    }
    return this.getOrderById(orderCreated.id);
  }

  async getOrders(data: GetOrdersDto): Promise<OrderInList[]> {
    const orders = await this.prisma.order
      .findMany({
        where: {
          deleted: data.deleted,
          userId: data.userId,
        },

        select: {
          _count: {
            select: {
              items: true,
            },
          },
          id: true,
          totalPrice: true,
          updatedAt: true,
        },
        skip: data.page * data.ordersPerPage,
        take: data.ordersPerPage,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!orders) {
      throw new RpcException('No orders were found.');
    }
    const result = [];
    let i = 0;
    orders.forEach(function (data) {
      result[i] = {
        orderId: data.id,
        varietyOfItems: data._count.items,
        totalPrice: data.totalPrice,
        updatedAt: data.updatedAt,
      };
      i++;
    });
    return result;
  }

  async deleteItem(data: DeleteItemInOrderDto): Promise<DeleteItemDto> {
    const countItems = await this.prisma.item
      .count({
        where: {
          orderId: data.orderId,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    const itemDeleted = await this.prisma.item
      .delete({
        where: {
          orderId_itemId: {
            orderId: data.orderId,
            itemId: data.itemId,
          },
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!itemDeleted) {
      throw new RpcException("The item in order wasn't deleted.");
    }
    if (countItems === 1) {
      const orderDeleted = await this.prisma.order
        .delete({
          where: {
            id: data.orderId,
          },
        })
        .catch((error) => {
          throw new RpcException(error);
        });
      if (!orderDeleted) {
        throw new RpcException("The empty order wasn't deleted.");
      }
      return { message: 'Order and item were deleted!' };
    }

    const items = await this.prisma.item
      .findMany({
        where: {
          orderId: data.orderId,
        },
        select: {
          price: true,
          quantity: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    let totalPrice = 0;
    items.forEach(function (item) {
      totalPrice += item.price * item.quantity;
    });

    const updatedTotalPrice = await this.prisma.order
      .update({
        where: {
          id: data.orderId,
        },
        data: {
          totalPrice: totalPrice,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!updatedTotalPrice) {
      throw new RpcException(
        "The item was deleted but total price wasn't updated",
      );
    }

    return { message: 'Item was deleted' };
  }

  async deleteOrder(id: string): Promise<DeletedOrderOutputDto> {
    const orderDeleted = await this.prisma.order
      .update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!orderDeleted) {
      throw new RpcException("The order wasn't deleted");
    }
    return { message: 'Order was deleted!' };
  }

  async updateOrder(data: UpdateOrderDto): Promise<Order | null> {
    if (!data.orderId) {
      throw new RpcException("The orderId wasn't provided");
    }
    if (data.discount < 0 || data.discount > 100) {
      throw new RpcException('Invalid amount of discount.');
    }

    const order = await this.prisma.order
      .findUnique({
        where: {
          id: data.orderId,
        },
        select: {
          totalPrice: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!order) {
      throw new RpcException("The order doesn't exist");
    }
    const newTotalPrice = Math.round(
      ((100 - data.discount) * order.totalPrice) / 100,
    );
    const orderUpdated = await this.prisma.order
      .update({
        where: {
          id: data.orderId,
        },
        data: {
          totalPrice: newTotalPrice,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!orderUpdated) {
      throw new RpcException("The order wasn't updated.");
    }
    return this.getOrderById(data.orderId);
  }
}
