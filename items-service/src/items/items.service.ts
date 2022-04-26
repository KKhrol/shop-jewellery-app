import { Injectable } from '@nestjs/common';
//import { Item } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemInCollection } from './interfaces/item-in-collection.interface';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async getItems(
    page: number,
    itemsPerPage: number,
    collectionId: string,
  ): Promise<Observable<ItemInCollection>> {
    const jewelleries = await this.prisma.jewellery.findMany({
      where: {
        collectionId: {
          equals: collectionId,
        },
      },
      select: {
        name: true,
        Item: {
          select: {
            id: true,
            price: true,
            image: {
              select: {
                imageURL: true,
              },
              take: 1,
            },
          },
          skip: page * itemsPerPage,
          take: itemsPerPage,
        },
      },
      take: 2,
    });

    const items = Array<ItemInCollection>();
    let k = 0;

    jewelleries.forEach(function (jewellery) {
      jewellery.Item.forEach(function (item) {
        items[k] = {
          id: item.id,
          name: jewellery.name,
          image: item.image[0].imageURL,
          price: item.price,
        };
        k++;
      });
    });

    const result = from(items);
    return result;
  }
}
