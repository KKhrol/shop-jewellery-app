import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeleteItemInOrderDto } from './dto/delete-item-in-order.dto';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { DeletedOrderOutputDto } from './dto/deleted-order-output.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderInList } from './dto/order-in-list.dto';
import { Order } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdatedOrderOuput } from './dto/updated-order-output.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async getOrderById(id: string): Promise<Order | null> {
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
      return null;
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

  async createOrder(data: CreateOrderDto): Promise<Order | null> {
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
      return null;
    }
    return this.getOrderById(orderCreated.id);
  }

  async getOrders(data: GetOrdersDto): Promise<OrderInList[] | null> {
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
      return null;
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

  async getOrderTotalPrice(orderId: string): Promise<number | null> {
    const items = await this.prisma.item
      .findMany({
        where: {
          orderId,
        },
        select: {
          price: true,
          quantity: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!items) {
      return null;
    }

    let totalPrice = 0;
    items.forEach(function (item) {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  async deleteItem(data: DeleteItemInOrderDto): Promise<DeleteItemDto> {
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
      return null;
    }

    return { message: 'Item was deleted' };
  }

  async deleteOrder(id: string): Promise<DeletedOrderOutputDto | null> {
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
      return null;
    }
    return { message: 'Order was deleted!' };
  }

  async updateOrder(data: UpdateOrderDto): Promise<UpdatedOrderOuput | null> {
    const newTotalPrice = Math.round(
      ((100 - data.discount) * data.oldTotalPrice) / 100,
    );
    const orderUpdated = await this.prisma.order
      .update({
        where: {
          id: data.orderId,
        },
        data: {
          totalPrice: newTotalPrice,
        },
        select: {
          id: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!orderUpdated) {
      return null;
    }
    return orderUpdated;
  }
}
