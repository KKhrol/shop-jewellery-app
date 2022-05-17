import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './interfaces/create-inventory.interface';
import { DeleteInventoryDto } from './interfaces/deleted-inventory-output';
import { Inventory } from './interfaces/inventory.interface';
import { UpdateInventoryDto } from './interfaces/update-inventory.interface';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}
  async getItemQuantity(id: string): Promise<Inventory> {
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
      return {
        quantity: 0,
      };
    }
    const result = {
      quantity: inventory.quantity,
    };
    return result;
  }

  async addItemInventory(data: CreateInventoryDto): Promise<Inventory> {
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
      throw new RpcException("The item inventory wasn't added");
    }

    return inventory;
  }

  async deleteItemInventory(id: string): Promise<DeleteInventoryDto> {
    // check if the inventory for item exists
    const inventory = await this.prisma.stock
      .findUnique({
        where: {
          itemId: id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!inventory) {
      throw new RpcException("The inventory for that item didn't exist");
    }
    const deletedInventory = await this.prisma.stock
      .delete({
        where: {
          itemId: id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!deletedInventory) {
      throw new RpcException("The item's inventory wasn't deleted.");
    }
    return { message: "The item's inventory was deleted!" };
  }

  async updateItemInventory(data: UpdateInventoryDto): Promise<Inventory> {
    if (!data.quantity) {
      throw new RpcException('No quantity was privided.');
    }
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
      throw new RpcException("The item's inventory wasn't upserted.");
    }
    const stock = await this.prisma.stock
      .findUnique({
        where: {
          itemId: data.id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!stock) {
      throw new RpcException("The item's inventory wasn't found.");
    }
    return stock;
  }
}
