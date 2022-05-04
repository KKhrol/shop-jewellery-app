import { Module } from '@nestjs/common';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { MetalsService } from './items/metals/metals.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService, MetalsService],
})
export class AppModule {}
