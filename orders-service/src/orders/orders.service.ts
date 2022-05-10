import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
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
  async getOrderById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return null;
    }

    const varietyOfItems = await this.prisma.item.count({
      where: {
        orderId: id,
      },
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
    const orderCreated = await this.prisma.order.create({
      data: {
        totalPrice: data.totalPrice,
        userId: data.userId,
        items: {
          createMany: {
            data: data.itemInOrder,
          },
        },
      },
    });
    if (!orderCreated) {
      return null;
    }
    return this.getOrderById(orderCreated.id);
  }

  async getOrders(data: GetOrdersDto): Promise<Observable<OrderInList> | null> {
    const orders = await this.prisma.order.findMany({
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
    return from(result);
  }

  async deleteItem(data: DeleteItemInOrderDto): Promise<DeleteItemDto> {
    const countItems = await this.prisma.item.count({
      where: {
        orderId: data.orderId,
      },
    });
    const itemDeleted = await this.prisma.item.delete({
      where: {
        orderId_itemId: {
          orderId: data.orderId,
          itemId: data.itemId,
        },
      },
    });
    if (countItems === 1) {
      const orderDeleted = await this.prisma.order.delete({
        where: {
          id: data.orderId,
        },
      });
      return { message: 'Order and item were deleted!' };
    }

    const items = await this.prisma.item.findMany({
      where: {
        orderId: data.orderId,
      },
      select: {
        price: true,
        quantity: true,
      },
    });

    let totalPrice = 0;
    let i = 0;
    items.forEach(function (item) {
      totalPrice += item.price * item.quantity;
      i++;
    });

    const updatedTotalPrice = await this.prisma.order.update({
      where: {
        id: data.orderId,
      },
      data: {
        totalPrice: totalPrice,
      },
    });

    return { message: 'Item was deleted' };
  }

  async deleteOrder(id: string): Promise<DeletedOrderOutputDto> {
    const orderDeleted = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return { message: 'Order was deleted!' };
  }

  async updateOrder(data: UpdateOrderDto): Promise<Order | null> {
    if (!data.orderId) {
      return null;
    }
    if (data.discount < 0 || data.discount > 100) {
      return null;
    }

    const order = await this.prisma.order.findUnique({
      where: {
        id: data.orderId,
      },
      select: {
        totalPrice: true,
      },
    });
    const newTotalPrice = ((100 - data.discount) * order.totalPrice) / 100;
    const orderUpdated = await this.prisma.order.update({
      where: {
        id: data.orderId,
      },
      data: {
        totalPrice: newTotalPrice,
      },
    });
    return this.getOrderById(data.orderId);
  }
}
