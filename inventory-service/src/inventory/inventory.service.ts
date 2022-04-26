import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inventory } from './interfaces/inventory.interface';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}
  async getItemQuantity(id: string): Promise<Inventory | null> {
    const inventory = await this.prisma.stock.findUnique({
      where: {
        itemId: id,
      },
      select: {
        quantity: true,
      },
    });
    const res = {
      quantity: inventory.quantity,
    };
    return res;
  }
}
