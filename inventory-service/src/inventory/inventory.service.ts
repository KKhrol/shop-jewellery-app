import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { DeleteInventoryDto } from './dto/deleted-inventory-output.dto';
import { Inventory } from './dto/inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}
  async getInventory(id: string): Promise<Inventory | null> {
    const inventory = await this.prisma.stock
      .findUnique({
        where: {
          itemId: id,
        },
        select: {
          quantity: true,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!inventory) {
      return null;
    }
    return inventory;
  }

  async addInventory(data: CreateInventoryDto): Promise<Inventory | null> {
    const inventory = await this.prisma.stock
      .create({
        data: {
          itemId: data.id,
          quantity: data.quantity,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!inventory) {
      return null;
    }
    return inventory;
  }

  async deleteInventory(id: string): Promise<DeleteInventoryDto | null> {
    const inventoryDeleted = await this.prisma.stock
      .delete({
        where: {
          itemId: id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!inventoryDeleted) {
      return null;
    }
    return { message: "The item's inventory was deleted!" };
  }

  async updateInventory(data: UpdateInventoryDto): Promise<Inventory | null> {
    const upsertedInventory = await this.prisma.stock
      .upsert({
        where: {
          itemId: data.id,
        },
        update: {
          quantity: data.quantity,
        },
        create: {
          itemId: data.id,
          quantity: data.quantity,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!upsertedInventory) {
      return null;
    }
    return upsertedInventory;
  }
}
