import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateInventoryDto } from './interfaces/create-inventory.interface';
import { DeleteInventoryDto } from './interfaces/deleted-inventory-output';
import { InventoryByItemId } from './interfaces/inventory-by-item-id.interface';
import { Inventory } from './interfaces/inventory.interface';
import { ResponseData } from './interfaces/response-data.interface';
import { UpdateInventoryDto } from './interfaces/update-inventory.interface';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @GrpcMethod('InventoryController', 'FindOne')
  async findOne(data: InventoryByItemId): Promise<ResponseData<Inventory>> {
    return {
      status: 'success',
      message: 'The inventory found.',
      data: await this.inventoryService.getItemQuantity(data.id),
    };
  }

  @GrpcMethod('InventoryController', 'PostOne')
  async postOne(data: CreateInventoryDto): Promise<ResponseData<Inventory>> {
    return {
      status: 'success',
      message: 'The inventory created.',
      data: await this.inventoryService.addItemInventory(data),
    };
  }

  @GrpcMethod('InventoryController', 'DeleteOne')
  async deleteOne(
    data: InventoryByItemId,
  ): Promise<ResponseData<DeleteInventoryDto>> {
    return {
      status: 'success',
      message: 'The inventory deleted.',
      data: await this.inventoryService.deleteItemInventory(data.id),
    };
  }

  @GrpcMethod('InventoryController', 'UpdateOne')
  async updateOne(data: UpdateInventoryDto): Promise<ResponseData<Inventory>> {
    return {
      status: 'success',
      message: 'The inventory updated.',
      data: await this.inventoryService.updateItemInventory(data),
    };
  }
}
