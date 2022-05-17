import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collection } from '@prisma/client';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { from, Observable } from 'rxjs';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';
import { RpcException } from '@nestjs/microservices';
import { CollectionFullInfo } from './interfaces/collection-full-info.interface';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollectionById(id: string): Promise<CollectionFullInfo | null> {
    const collection = await this.prisma.collection
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!collection) {
      throw new RpcException("Collection doesn't exist!");
    }
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      image: collection.image,
      createdAt: collection.createdAt.toUTCString(),
      updatedAt: collection.updatedAt.toUTCString(),
    };
  }

  async getCollections(
    page: number,
    itemsPerPage: number,
  ): Promise<Collection[]> {
    const collections = await this.prisma.collection
      .findMany({
        skip: page * itemsPerPage,
        take: itemsPerPage,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!collections) {
      throw new RpcException('No collections!');
    }
    console.log(collections);
    /*const result = from(collections);*/
    return collections;
  }

  async addCollection(data: CreateCollectionDto): Promise<Collection> {
    const collection = await this.prisma.collection
      .create({
        data: data,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!collection) {
      throw new RpcException("The collection wasn't inserted!");
    }
    return collection;
  }

  async deleteCollection(id: string): Promise<DeleteCollectionDto> {
    const deletedCollection = await this.prisma.collection
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!deletedCollection) {
      throw new RpcException("The collection wasn't deleted!");
    }
    return { message: 'Collection was deleted!' };
  }

  async updateCollection(data: UpdateCollectionDto): Promise<Collection> {
    const collection = await this.prisma.collection
      .update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          description: data.description,
          image: data.image,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!collection) {
      throw new RpcException("The collection wasn't updated!");
    }
    return collection;
  }
}
