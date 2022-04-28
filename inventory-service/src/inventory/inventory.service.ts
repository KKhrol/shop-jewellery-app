import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './interfaces/create-inventory.interface';
import { DeleteInventoryDto } from './interfaces/deleted-inventory-output';
import { Inventory } from './interfaces/inventory.interface';
import { UpdateInventoryDto } from './interfaces/update-inventory.interface';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}
  async getItemQuantity(id: string): Promise<Inventory> {
    const inventory = await this.prisma.stock.findUnique({
      where: {
        itemId: id,
      },
      select: {
        quantity: true,
      },
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
    const inventory = await this.prisma.stock.create({
      data: {
        itemId: data.id,
        quantity: data.quantity,
      },
    });

    return inventory;
  }

  async deleteItemInventory(id: string): Promise<DeleteInventoryDto> {
    // check if the inventory for item exists
    const inventory = await this.prisma.stock.findUnique({
      where: {
        itemId: id,
      },
    });
    if (inventory) {
      const deletedInventory = await this.prisma.stock.delete({
        where: {
          itemId: id,
        },
      });
      console.log(deletedInventory);
      return { message: 'The inventory was deleted!' };
    }

    return { message: "The inventory for that item didn't exist" };
  }

  async updateItemInventory(data: UpdateInventoryDto): Promise<Inventory> {
    if (data.quantity) {
      return await this.prisma.stock.upsert({
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
      });
    }

    return await this.prisma.stock.findUnique({
      where: {
        itemId: data.id,
      },
    });
  }
}
