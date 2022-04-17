import { Module } from '@nestjs/common';
import { CartsController } from './carts/carts.controller';

@Module({
  imports: [],
  controllers: [CartsController],
})
export class AppModule {}
