import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateItemDto } from './interfaces/create-item.interface';
import { ItemOutputDto } from './interfaces/item-output.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { ItemById } from './interfaces/item-by-id.interface';
import { ItemInCollection } from './interfaces/item-in-collection.interface';
import { Item } from './interfaces/item.interface';
import { ItemsOnPage } from './interfaces/items-page.interface';
import { ItemsService } from './items.service';
import { UpdateItemDto } from './interfaces/update-item.interface';
import { UpdateMetalDto } from './metals/interfaces/update-metal.interface';
import { Metal } from './metals/interfaces/metal.interface';
import { MetalById } from './metals/interfaces/metal-by-id.interface';
import { DeleteMetalDto } from './metals/interfaces/deleted-metal-output.interface';
import { CreateMetalDto } from './metals/interfaces/create-metal.interface';
import { MetalsService } from './metals/metals.service';
import { ResponseData } from './interfaces/response-data.interface';

@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly metalsService: MetalsService,
  ) {}

  @GrpcMethod('ItemsController', 'FindOne')
  async findOne(data: ItemById): Promise<ResponseData<Item>> {
    return {
      status: 'success',
      message: 'Item found.',
      data: await this.itemsService.getItemById(data.id),
    };
  }

  @GrpcMethod('ItemsController', 'FindMany')
  async findMany(data: ItemsOnPage): Promise<ResponseData<ItemInCollection[]>> {
    return {
      status: 'success',
      message: 'Items found.',
      data: await this.itemsService.getItems(
        data.page,
        data.itemsPerPage,
        data.collectionId,
      ),
    };
  }

  @GrpcMethod('ItemsController', 'PostOne')
  async postOne(data: CreateItemDto): Promise<ResponseData<ItemOutputDto>> {
    return {
      status: 'success',
      message: 'Item created.',
      data: await this.itemsService.addItem(data),
    };
  }

  @GrpcMethod('ItemsController', 'DeleteOne')
  async deleteOne(data: ItemById): Promise<ResponseData<DeleteItemDto>> {
    return {
      status: 'success',
      message: 'Item deleted.',
      data: await this.itemsService.deleteItem(data.id),
    };
  }

  @GrpcMethod('ItemsController', 'UpdateOne')
  async updateOne(data: UpdateItemDto): Promise<ResponseData<ItemOutputDto>> {
    return {
      status: 'success',
      message: 'Item updated.',
      data: await this.itemsService.updateItem(data),
    };
  }

  @GrpcMethod('ItemsController', 'UpdateMetal')
  async updateMetal(
    updateMetalDto: UpdateMetalDto,
  ): Promise<ResponseData<Metal>> {
    return {
      status: 'success',
      message: 'Metal updated.',
      data: await this.metalsService.updateMetal(updateMetalDto),
    };
  }

  @GrpcMethod('ItemsController', 'DeleteMetal')
  async deleteMetal(data: MetalById): Promise<ResponseData<DeleteMetalDto>> {
    return {
      status: 'success',
      message: 'Metal deleted.',
      data: await this.metalsService.deleteMetal(data.id),
    };
  }

  @GrpcMethod('ItemsController', 'AddMetal')
  async addMetal(createMetalDto: CreateMetalDto): Promise<ResponseData<Metal>> {
    return {
      status: 'success',
      message: 'Metal created.',
      data: await this.metalsService.addMetal(createMetalDto),
    };
  }

  @GrpcMethod('ItemsController', 'FindMetals')
  async findMetals(): Promise<ResponseData<Metal[]>> {
    return {
      status: 'success',
      message: 'Metals found.',
      data: await this.metalsService.getMetals(),
    };
  }
}
