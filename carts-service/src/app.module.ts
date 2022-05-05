import { Module } from '@nestjs/common';
import { CartsController } from './carts/carts.controller';
import { PrismaService } from './prisma/prisma.service';
import { CartsService } from './carts/carts.service';

@Module({
  imports: [],
  controllers: [CartsController],
  providers: [PrismaService, CartsService],
})
export class AppModule {}
