import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './interfaces/create-item.interface';
import { ItemOutputDto } from './interfaces/item-output.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { ItemInCollection } from './interfaces/item-in-collection.interface';
import { Item } from './interfaces/item.interface';
import { UpdateItemDto } from './interfaces/update-item.interface';

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
      orderBy: {
        updatedAt: 'desc',
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

  async addItem(data: CreateItemDto): Promise<ItemOutputDto> {
    const item = await this.prisma.item.create({
      data: {
        price: data.price,
        description: data.descriptionItem,
        delivery: data.delivery,
        jewellery: {
          connectOrCreate: {
            where: {
              name: data.name,
            },
            create: {
              name: data.name,
              description: data.descriptionJewellery,
              collectionId: data.collectionId,
            },
          },
        },
        metal: {
          connectOrCreate: {
            where: {
              name: data.metalName,
            },
            create: {
              name: data.metalName,
              care: data.care,
              image: data.metalImage,
            },
          },
        },
        image: {
          create: Array.from(data.images).map((image) => ({
            imageURL: image,
          })),
        },
      },
      include: {
        jewellery: true,
        metal: true,
        image: true,
      },
    });

    const images = Array<string>();

    let i = 0;
    item.image.forEach(function (item) {
      images[i] = item.imageURL;
      i++;
    });

    const res = {
      id: item.id,
      jewelleryId: item.jewelleryId,
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
    };
    return res;
  }

  async deleteItem(id: string): Promise<DeleteItemDto> {
    const jewelleryId = (
      await this.prisma.item.findUnique({
        where: {
          id,
        },
        select: {
          jewelleryId: true,
        },
      })
    ).jewelleryId;

    //this shows how many jewelleries we have (jewellery is the same, but it can be in different colors)
    const jewelleryCount = (
      await this.prisma.item.aggregate({
        where: {
          jewelleryId: {
            equals: jewelleryId,
          },
        },
        _count: {
          metalId: true,
        },
      })
    )._count.metalId;

    await this.prisma.image.deleteMany({
      where: {
        itemId: id,
      },
    });

    const deletedItem = await this.prisma.item.delete({
      where: {
        id,
      },
    });
    console.log(deletedItem);

    //if we had jewellery (item) in the only 1 color (which we deleted above), then we need to delete the jewellery itself
    if (jewelleryCount === 1) {
      const jewelleryDeleted = await this.prisma.jewellery.delete({
        where: {
          id: jewelleryId,
        },
      });
      console.log(jewelleryDeleted);
    }

    const result = { message: 'Item was deleted!' };
    return result;
  }

  //not fully implemented. need to think over.
  async updateItem(data: UpdateItemDto): Promise<ItemOutputDto> {
    if (data.images) {
      await this.prisma.image.deleteMany({
        where: {
          itemId: data.id,
        },
      });
      await this.prisma.image.createMany({
        data: Array.from(data.images).map((image) => ({
          imageURL: image,
          itemId: data.id,
        })),
      });
    }

    let item = await this.prisma.item.update({
      where: {
        id: data.id,
      },
      data: {
        price: data.price,
        description: data.descriptionItem,
        delivery: data.delivery,
      },
      include: {
        jewellery: true,
        image: true,
        metal: true,
      },
    });

    // Is there a need to delete "old" jewellery, in case we create the new one?
    if (data.name) {
      item = await this.prisma.item.update({
        where: {
          id: data.id,
        },
        data: {
          jewellery: {
            connectOrCreate: {
              where: {
                name: data.name,
              },
              create: {
                name: data.name,
                description: data.descriptionJewellery,
                collectionId: data.collectionId,
              },
            },
          },
        },
        include: {
          jewellery: true,
          image: true,
          metal: true,
        },
      });
    }

    if (data.descriptionJewellery || data.collectionId) {
      item = await this.prisma.item.update({
        where: {
          id: data.id,
        },
        data: {
          jewellery: {
            update: {
              description: data.descriptionJewellery,
              collectionId: data.collectionId,
            },
          },
        },
        include: {
          jewellery: true,
          image: true,
          metal: true,
        },
      });
    }

    const images = Array<string>();

    let i = 0;
    item.image.forEach(function (item) {
      images[i] = item.imageURL;
      i++;
    });

    const res = {
      id: item.id,
      jewelleryId: item.jewelleryId,
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
    };
    return res;
  }
}
