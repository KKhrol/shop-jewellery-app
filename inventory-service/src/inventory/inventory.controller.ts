import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateInventoryDto } from './interfaces/create-inventory.interface';
import { DeleteInventoryDto } from './interfaces/deleted-inventory-output';
import { InventoryByItemId } from './interfaces/inventory-by-item-id.interface';
import { Inventory } from './interfaces/inventory.interface';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @GrpcMethod('InventoryController', 'FindOne')
  async findOne(data: InventoryByItemId): Promise<Inventory> {
    return this.inventoryService.getItemQuantity(data.id);
  }

  @GrpcMethod('InventoryController', 'PostOne')
  async postOne(data: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.addItemInventory(data);
  }

  @GrpcMethod('InventoryController', 'DeleteOne')
  async deleteOne(data: InventoryByItemId): Promise<DeleteInventoryDto> {
    return this.inventoryService.deleteItemInventory(data.id);
  }

  @GrpcMethod('InventoryController', 'UpdateOne')
  async updateOne(data: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.updateItemInventory(data);
  }
}
