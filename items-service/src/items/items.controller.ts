import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
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

@Controller()
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly metalsService: MetalsService,
  ) {}

  @GrpcMethod('ItemsController', 'FindOne')
  async findOne(data: ItemById): Promise<Item> {
    return this.itemsService.getItemById(data.id);
  }

  @GrpcMethod('ItemsController', 'FindMany')
  async findMany(data: ItemsOnPage): Promise<Observable<ItemInCollection>> {
    return this.itemsService.getItems(
      data.page,
      data.itemsPerPage,
      data.collectionId,
    );
  }

  @GrpcMethod('ItemsController', 'PostOne')
  async postOne(data: CreateItemDto): Promise<ItemOutputDto> {
    return this.itemsService.addItem(data);
  }

  @GrpcMethod('ItemsController', 'DeleteOne')
  async deleteOne(data: ItemById): Promise<DeleteItemDto> {
    return this.itemsService.deleteItem(data.id);
  }

  @GrpcMethod('ItemsController', 'UpdateOne')
  async updateOne(data: UpdateItemDto): Promise<ItemOutputDto> {
    return this.itemsService.updateItem(data);
  }

  @GrpcMethod('ItemsController', 'UpdateMetal')
  async updateMetal(updateMetalDto: UpdateMetalDto): Promise<Metal> {
    return this.metalsService.updateMetal(updateMetalDto);
  }

  @GrpcMethod('ItemsController', 'DeleteMetal')
  async deleteMetal(data: MetalById): Promise<DeleteMetalDto> {
    return this.metalsService.deleteMetal(data.id);
  }

  @GrpcMethod('ItemsController', 'AddMetal')
  async addMetal(createMetalDto: CreateMetalDto): Promise<Metal> {
    return this.metalsService.addMetal(createMetalDto);
  }

  @GrpcMethod('ItemsController', 'FindMetals')
  async findMetals(): Promise<Observable<Metal>> {
    return this.metalsService.getMetals();
  }
}
