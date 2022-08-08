import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collection } from '@prisma/client';

import { RpcException } from '@nestjs/microservices';
import { CollectionFullInfo } from './dto/collection-full-info.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { DeleteCollectionDto } from './dto/delete-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollection(id: string): Promise<CollectionFullInfo | null> {
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
      return null;
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
  ): Promise<Collection[] | null> {
    const collections = await this.prisma.collection
      .findMany({
        skip: page * itemsPerPage,
        take: itemsPerPage,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!collections) {
      return null;
    }
    return collections;
  }

  async addCollection(data: CreateCollectionDto): Promise<Collection | null> {
    const collection = await this.prisma.collection
      .create({
        data: data,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!collection) {
      return null;
    }
    return collection;
  }

  async deleteCollection(id: string): Promise<DeleteCollectionDto | null> {
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
      return null;
    }
    return { message: 'Collection was deleted!' };
  }

  async updateCollection(
    data: UpdateCollectionDto,
  ): Promise<Collection | null> {
    const collection = await this.prisma.collection
      .update({
        where: {
          id: data.id,
        },
        data,
      })
      .catch((error) => {
        throw new RpcException(error);
      });
    if (!collection) {
      return null;
    }
    return collection;
  }
}
