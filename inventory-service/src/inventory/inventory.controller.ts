import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { DeleteInventoryDto } from './dto/deleted-inventory-output.dto';
import { InventoryByItemId } from './dto/inventory-by-item-id.dto';
import { Inventory } from './dto/inventory.dto';
import { ResponseData } from './dto/response-data.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @GrpcMethod('InventoryController', 'FindOne')
  async findOne(data: InventoryByItemId): Promise<ResponseData<Inventory>> {
    const inventory = await this.inventoryService.getInventory(data.id);
    if (!inventory) {
      throw new RpcException("The inventory wasn't found");
    }
    return {
      status: 'success',
      message: 'The inventory found.',
      data: inventory,
    };
  }

  @GrpcMethod('InventoryController', 'PostOne')
  async postOne(data: CreateInventoryDto): Promise<ResponseData<Inventory>> {
    const inventory = await this.inventoryService.addInventory(data);
    if (!inventory) {
      throw new RpcException("The item inventory wasn't added");
    }
    return {
      status: 'success',
      message: 'The inventory created.',
      data: inventory,
    };
  }

  @GrpcMethod('InventoryController', 'DeleteOne')
  async deleteOne(
    data: InventoryByItemId,
  ): Promise<ResponseData<DeleteInventoryDto>> {
    const inventoryDeleted = await this.inventoryService.deleteInventory(
      data.id,
    );
    if (!inventoryDeleted) {
      throw new RpcException("The item's inventory wasn't deleted.");
    }
    return {
      status: 'success',
      message: 'The inventory deleted.',
      data: inventoryDeleted,
    };
  }

  @GrpcMethod('InventoryController', 'UpdateOne')
  async updateOne(data: UpdateInventoryDto): Promise<ResponseData<Inventory>> {
    if (!data.quantity) {
      throw new RpcException('No quantity was privided.');
    }

    const inventoryUpdated = await this.inventoryService.updateInventory(data);

    if (!inventoryUpdated) {
      throw new RpcException("The item's inventory wasn't upserted.");
    }
    return {
      status: 'success',
      message: 'The inventory updated.',
      data: inventoryUpdated,
    };
  }
}
