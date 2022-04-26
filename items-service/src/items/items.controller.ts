import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ItemById } from './interfaces/item-by-id.interface';
import { ItemInCollection } from './interfaces/item-in-collection.interface';
import { Item } from './interfaces/item.interface';
import { ItemsOnPage } from './interfaces/items-page.interface';
import { ItemsService } from './items.service';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

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
}
