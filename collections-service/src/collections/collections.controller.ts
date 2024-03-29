import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CollectionsService } from './collections.service';
import { CollectionById } from './dto/collection-by-id.dto';
import { CollectionFullInfo } from './dto/collection-full-info.dto';
import { Collection } from './dto/collection.dto';
import { CollectionsOnPage } from './dto/collections-page.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { DeleteCollectionDto } from './dto/delete-collection.dto';
import { ResponseData } from './dto/response-data.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @GrpcMethod('CollectionsController', 'FindOne')
  async findOne(
    data: CollectionById,
  ): Promise<ResponseData<CollectionFullInfo>> {
    const collection = await this.collectionsService.getCollection(data.id);
    if (!collection) {
      throw new RpcException("The collection wasn't found!");
    }
    return {
      status: 'success',
      message: 'Collection found.',
      data: collection,
    };
  }

  @GrpcMethod('CollectionsController', 'FindMany')
  async findMany(data: CollectionsOnPage): Promise<ResponseData<Collection[]>> {
    const collections = await this.collectionsService.getCollections(
      data.page,
      data.itemsPerPage,
    );
    if (!collections) {
      throw new RpcException('No collections found!');
    }
    return {
      status: 'success',
      message: 'Collections found.',
      data: collections,
    };
  }

  @GrpcMethod('CollectionsController', 'PostCollection')
  async postCollection(
    createCollectionDto: CreateCollectionDto,
  ): Promise<ResponseData<Collection>> {
    const collection = await this.collectionsService.addCollection(
      createCollectionDto,
    );

    if (!collection) {
      throw new RpcException("The collection wasn't inserted!");
    }

    return {
      status: 'success',
      message: 'Collection created.',
      data: collection,
    };
  }

  @GrpcMethod('CollectionsController', 'UpdateOne')
  async updateOne(
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<ResponseData<Collection>> {
    const updatedCollection = await this.collectionsService.updateCollection(
      updateCollectionDto,
    );

    if (!updatedCollection) {
      throw new RpcException("The collection wasn't updated!");
    }

    return {
      status: 'success',
      message: 'Collection updated.',
      data: updatedCollection,
    };
  }

  @GrpcMethod('CollectionsController', 'DeleteOne')
  async deleteOne(
    collectionById: CollectionById,
  ): Promise<ResponseData<DeleteCollectionDto>> {
    const deletedCollection = await this.collectionsService.deleteCollection(
      collectionById.id,
    );

    if (!deletedCollection) {
      throw new RpcException("The collection wasn't deleted!");
    }

    return {
      status: 'success',
      message: 'Collection deleted.',
      data: deletedCollection,
    };
  }
}
