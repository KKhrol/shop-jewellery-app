import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CollectionById } from './interfaces/collection-by-id.interface';
import { Collection } from './interfaces/collection.interface';

@Controller('collections')
export class CollectionsController {
  //constructor(private collectionsService: CollectionsService){}
  @GrpcMethod('CollectionsService', 'FindOne')
  findOne(data: CollectionById): Collection {
    console.log('Here');
    const collections = [
      {
        id: '1a',
        name: 'Maria',
        description: 'description',
        image: 'URL-image',
      },
      {
        id: '2b',
        name: 'Antuanneta',
        description: 'description',
        image: 'URL-image',
      },
    ];
    return collections.find(({ id }) => id === data.id);
  }
}
