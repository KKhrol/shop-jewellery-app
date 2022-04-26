import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collection } from '@prisma/client';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { from, Observable } from 'rxjs';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollectionById(id: string): Promise<Collection | null> {
    const collection = await this.prisma.collection.findUnique({
      where: {
        id,
      },
    });
    console.log(collection);
    return collection;
  }

  async getCollections(
    page: number,
    itemsPerPage: number,
  ): Promise<Observable<Collection>> {
    const collections = await this.prisma.collection.findMany({
      skip: page * itemsPerPage,
      take: itemsPerPage,
    });
    const result = from(collections);
    return result;
  }

  async addCollection(data: CreateCollectionDto): Promise<Collection> {
    const collection = await this.prisma.collection.create({
      data: data,
    });
    return collection;
  }

  async deleteCollection(id: string): Promise<DeleteCollectionDto> {
    await this.prisma.collection.delete({
      where: {
        id,
      },
    });

    return { message: 'Collection was deleted!' };
  }

  async updateCollection(data: UpdateCollectionDto): Promise<Collection> {
    const collection = await this.prisma.collection.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
    return collection;
  }
}
