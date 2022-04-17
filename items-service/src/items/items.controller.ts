import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ItemById } from './interfaces/item-by-id.interface';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  @GrpcMethod('ItemsService', 'FindOne')
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
  }
}
