import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, of, timeout, toArray } from 'rxjs';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { ICollectionsService } from './interfaces/collection-service.interface';
import { Collection } from './interfaces/collection.interface';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';
import { IItemsService } from '../items/interfaces/item-service.interface';
import { CollectionWithItems } from '../common-interfaces/collection-with-items.interface';
import { ItemInCollection } from 'src/items/interfaces/item-in-collection.interface';

@Controller('collections')
export class CollectionsController implements OnModuleInit {
  constructor(
    @Inject('COLLECTION_PACKAGE') private readonly clientCollection: ClientGrpc,
    @Inject('ITEM_PACKAGE') private readonly clientItem: ClientGrpc,
  ) {}

  private collectionsService: ICollectionsService;
  private itemsService: IItemsService;
  onModuleInit() {
    this.collectionsService =
      this.clientCollection.getService<ICollectionsService>(
        'CollectionsController',
      );
    this.itemsService =
      this.clientItem.getService<IItemsService>('ItemsController');
  }

  @Get(':id')
  getCollection(
    @Param('id') collectionId: string,
    @Query('page') numberOfPage: number,
  ): Observable<
    ItemInCollection[]
  > /*Observable<CollectionWithItems>*/ /*Observable<Collection>*/ {
    const itemsPerPage = 3;
    const page = Number(numberOfPage);

    const stream = this.itemsService.findMany({
      page,
      itemsPerPage,
      collectionId,
    });
    //.pipe(timeout(10000));
    const items = stream.pipe(toArray());
    const collection = this.collectionsService.findOne({ id: collectionId });
    //.pipe(timeout(10000));
    //return of({ collection, items });
    return items;
  }

  @Get()
  getCollections(
    @Query('page') numberOfPage: number,
  ): Observable<Collection[]> {
    const itemsPerPage = 20;
    const page = Number(numberOfPage);

    const stream = this.collectionsService.findMany({ page, itemsPerPage });
    return stream.pipe(toArray());
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  postOne(
    @Body() createCollectionDto: CreateCollectionDto,
  ): Observable<Collection> {
    return this.collectionsService.postOne(createCollectionDto);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Observable<Collection> {
    updateCollectionDto.id = id;
    return this.collectionsService.updateOne(updateCollectionDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<DeleteCollectionDto> {
    return this.collectionsService.deleteOne({ id });
  }
}
