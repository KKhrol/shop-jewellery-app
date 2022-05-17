import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CollectionsService } from './collections.service';
import { CollectionById } from './interfaces/collection-by-id.interface';
import { CollectionFullInfo } from './interfaces/collection-full-info.interface';
import { Collection } from './interfaces/collection.interface';
import { CollectionsOnPage } from './interfaces/collections-page.interface';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';
import { ResponseData } from './interfaces/response-data.interface';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @GrpcMethod('CollectionsController', 'FindOne')
  async findOne(
    data: CollectionById,
  ): Promise<ResponseData<CollectionFullInfo>> {
    return {
      status: 'success',
      message: 'Collection found.',
      data: await this.collectionsService.getCollectionById(data.id),
    };
  }

  @GrpcMethod('CollectionsController', 'FindMany')
  async findMany(data: CollectionsOnPage): Promise<ResponseData<Collection[]>> {
    return {
      status: 'success',
      message: 'Collections found.',
      data: await this.collectionsService.getCollections(
        data.page,
        data.itemsPerPage,
      ),
    };
  }

  @GrpcMethod('CollectionsController', 'PostCollection')
  async postCollection(
    createCollectionDto: CreateCollectionDto,
  ): Promise<ResponseData<Collection>> {
    return {
      status: 'success',
      message: 'Collection created.',
      data: await this.collectionsService.addCollection(createCollectionDto),
    };
  }

  @GrpcMethod('CollectionsController', 'UpdateOne')
  async updateOne(
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<ResponseData<Collection>> {
    return {
      status: 'success',
      message: 'Collection updated.',
      data: await this.collectionsService.updateCollection(updateCollectionDto),
    };
  }

  @GrpcMethod('CollectionsController', 'DeleteOne')
  async deleteOne(
    collectionById: CollectionById,
  ): Promise<ResponseData<DeleteCollectionDto>> {
    return {
      status: 'success',
      message: 'Collection deleted.',
      data: await this.collectionsService.deleteCollection(collectionById.id),
    };
  }
}
