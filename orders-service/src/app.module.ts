import { Module } from '@nestjs/common';
import { OrdersController } from './orders/orders.controller';
import { PrismaService } from './prisma/prisma.service';
import { OrdersService } from './orders/orders.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [PrismaService, OrdersService],
})
export class AppModule {}
