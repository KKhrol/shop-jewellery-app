import { Module } from '@nestjs/common';
import { InventoryController } from './inventories/inventory.controller';

@Module({
  imports: [],
  controllers: [InventoryController],
})
export class AppModule {}
