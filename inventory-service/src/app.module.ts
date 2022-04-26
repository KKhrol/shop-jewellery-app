import { Module } from '@nestjs/common';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';

import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [PrismaService, InventoryService],
})
export class AppModule {}
