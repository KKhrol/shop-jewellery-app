import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InventoryByItemId } from './interfaces/inventory-by-item-id.interface';
import { Inventory } from './interfaces/inventory.interface';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @GrpcMethod('InventoryController', 'FindOne')
  findOne(data: InventoryByItemId): Promise<Inventory> {
    return this.inventoryService.getItemQuantity(data.id);
  }
}
