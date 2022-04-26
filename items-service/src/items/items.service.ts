import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemInCollection } from './interfaces/item-in-collection.interface';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}
  async getItemById(id: string): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        jewellery: true,
        metal: {
          select: {
            name: true,
            image: true,
            care: true,
          },
        },
        price: true,
        description: true,
        delivery: true,
        image: {
          select: {
            imageURL: true,
          },
        },
      },
    });

    const metals = await this.prisma.item.findMany({
      where: {
        jewelleryId: {
          equals: (
            await this.prisma.item.findUnique({
              where: {
                id,
              },
              select: {
                jewelleryId: true,
              },
            })
          ).jewelleryId,
        },
      },
      select: {
        metal: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    const images = Array<string>();
    const availableMetals = Array<string>();
    const availableMetalsImages = Array<string>();

    let i = 0;
    item.image.forEach(function (item) {
      images[i] = item.imageURL;
      i++;
    });

    i = 0;
    metals.forEach(function (metal) {
      availableMetals[i] = metal.metal.name;
      availableMetalsImages[i] = metal.metal.image;
      i++;
    });

    const result = {
      id: item.id,
      jewelleryId: item.jewellery.id,
      name: item.jewellery.name,
      descriptionJewellery: item.jewellery.description,
      collectionId: item.jewellery.collectionId,
      metalName: item.metal.name,
      metalImage: item.metal.image,
      care: item.metal.care,
      price: item.price,
      descriptionItem: item.description,
      delivery: item.delivery,
      images: images,
      availableMetals: availableMetals,
      availableMetalsImages: availableMetalsImages,
    };

    return result;
  }

  async getItems(
    page: number,
    itemsPerPage: number,
    collectionId: string,
  ): Promise<Observable<ItemInCollection>> {
    const items = await this.prisma.item.findMany({
      where: {
        jewellery: {
          collectionId: {
            equals: collectionId,
          },
        },
      },
      select: {
        jewellery: {
          select: {
            name: true,
          },
        },
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
    });

    const res = Array<ItemInCollection>();
    let i = 0;
    items.forEach(function (item) {
      res[i] = {
        id: item.id,
        name: item.jewellery.name,
        image: item.image[0].imageURL,
        price: item.price,
      };
      i++;
    });

    const result = from(res);
    return result;
  }
}
