import { Module } from '@nestjs/common';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [],
  controllers: [ItemsController],
})
export class AppModule {}
