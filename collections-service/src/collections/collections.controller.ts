import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CollectionsService } from './collections.service';
import { CollectionById } from './interfaces/collection-by-id.interface';
import { Collection } from './interfaces/collection.interface';
import { CollectionsOnPage } from './interfaces/collections-page.interface';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @GrpcMethod('CollectionsController', 'FindOne')
  async findOne(data: CollectionById): Promise<Collection> {
    return this.collectionsService.getCollectionById(data.id);
  }

  @GrpcMethod('CollectionsController', 'FindMany')
  async findMany(data: CollectionsOnPage): Promise<Observable<Collection>> {
    return this.collectionsService.getCollections(data.page, data.itemsPerPage);
  }

  @GrpcMethod('CollectionsController', 'PostCollection')
  async postCollection(
    createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.addCollection(createCollectionDto);
  }

  @GrpcMethod('CollectionsController', 'UpdateOne')
  async updateOne(
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.updateCollection(updateCollectionDto);
  }

  @GrpcMethod('CollectionsController', 'DeleteOne')
  async deleteOne(data: CollectionById): Promise<DeleteCollectionDto> {
    return this.collectionsService.deleteCollection(data.id);
  }
}
