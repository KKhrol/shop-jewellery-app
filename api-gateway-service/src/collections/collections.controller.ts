import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ICollectionsService } from './interfaces/collection-service.interface';
import { Collection } from './interfaces/collection.interface';

@Controller('collections')
export class CollectionsController implements OnModuleInit {
  constructor(
    @Inject('COLLECTION_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  private collectionsService: ICollectionsService;
  onModuleInit() {
    this.collectionsService =
      this.client.getService<ICollectionsService>('CollectionsService');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Collection> {
    return this.collectionsService.findOne({ id });
  }
}
