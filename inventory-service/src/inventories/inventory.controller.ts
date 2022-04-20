import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InventoryByItemId } from './interfaces/inventory-by-item-id.interface';
import { Inventory } from './interfaces/inventory.interface';

@Controller('inventory')
export class InventoryController {
  //constructor(private inventoryService: InventoryService){}
  @GrpcMethod('InventoryService', 'FindOne')
  findOne(data: InventoryByItemId): Inventory {
    const inventories = [
      {
        id: '1a',
        quantity: 1234,
      },
      {
        id: '2b',
        quantity: 2434,
      },
    ];
    return inventories.find(({ id }) => id === data.id);
  }
}
