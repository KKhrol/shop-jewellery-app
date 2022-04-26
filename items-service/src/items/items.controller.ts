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

  /*@GrpcMethod('ItemsController', 'FindOne')
  findOne(data: ItemById): Item {
    console.log('Here');
    const items = [
      {
        id: '1a',
        name: 'Maria Earrings',
        descriptionJewellery: 'descriptionJewellery',
        image: ['URL_image1', 'URL_image2', 'URL_image3'],
        material: 'material',
        care: 'care',
        price: 24.76,
        descriptionItem: 'descriptionItem',
        delivery: 'delivery',
        rating: 4.8,
        voters: 34,
        quantity: 234,
      },
      {
        id: '2b',
        name: 'De Bridge Ring',
        descriptionJewellery: 'descriptionJewellery',
        image: ['URL_image1', 'URL_image2', 'URL_image3'],
        material: 'material',
        care: 'care',
        price: 345.76,
        descriptionItem: 'descriptionItem',
        delivery: 'delivery',
        rating: 4.96,
        voters: 89,
        quantity: 45,
      },
    ];
    return items.find(({ id }) => id === data.id);
  }*/

  @GrpcMethod('ItemsController', 'FindMany')
  async findMany(data: ItemsOnPage): Promise<Observable<ItemInCollection>> {
    return this.itemsService.getItems(
      data.page,
      data.itemsPerPage,
      data.collectionId,
    );
  }
}
