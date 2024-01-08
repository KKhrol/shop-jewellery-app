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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { forkJoin, Observable } from 'rxjs';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { ICollectionsService } from './interfaces/collection-service.interface';
import { Collection } from './interfaces/collection.interface';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';
import { IItemsService } from '../items/interfaces/item-service.interface';
import { ItemInCollection } from '../items/interfaces/item-in-collection.interface';
import { CreateItemInCollection } from '../common-interfaces/create-item-in-collection.interface';
import { CreateItemDto } from '../items/interfaces/create-item.interface';
import { ItemOutputDto } from '../items/interfaces/item-output.interface';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { ResponseError } from '../common-interfaces/response-error.interface';
import { CollectionFullInfo } from './interfaces/collection-full-info.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../filters/exception.filter';

//@UseFilters(new HttpExceptionFilter())
//@UseGuards(JwtAuthGuard)
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
    [
      ResponseData<CollectionFullInfo> | ResponseError,
      ResponseData<ItemInCollection[]> | ResponseError,
    ]
  > {
    const itemsPerPage = 3;
    const page = Number(numberOfPage);

    const collection = this.collectionsService.findOne({ id: collectionId });

    const items = this.itemsService.findMany({
      page,
      itemsPerPage,
      collectionId,
    });
    return forkJoin([collection, items]);
  }

  @Get()
  getCollections(
    @Query('page') numberOfPage: number,
  ): Observable<ResponseData<Collection[]> | ResponseError> {
    const itemsPerPage = 5;
    const page = Number(numberOfPage);

    const collections = this.collectionsService.findMany({
      page,
      itemsPerPage,
    });
    return collections;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  postCollection(
    @Body() createCollectionDto: CreateCollectionDto,
  ): Observable<ResponseData<Collection> | ResponseError> {
    const collectionCreated =
      this.collectionsService.postCollection(createCollectionDto);
    return collectionCreated;
  }

  @Post(':id/items')
  @HttpCode(HttpStatus.CREATED)
  postItemInCollection(
    @Param('id') collectionId: string,
    @Body() createItemInCollection: CreateItemInCollection,
  ): Observable<ResponseData<ItemOutputDto> | ResponseError> {
    const createItem: CreateItemDto = createItemInCollection;
    createItem.collectionId = collectionId;

    return this.itemsService.postOne(createItem);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Observable<ResponseData<Collection> | ResponseError> {
    updateCollectionDto.id = id;
    const updatedCollection =
      this.collectionsService.updateOne(updateCollectionDto);
    return updatedCollection;
  }

  @Delete(':id')
  deleteOne(
    @Param('id') id: string,
  ): Observable<ResponseData<DeleteCollectionDto> | ResponseError> {
    const deletedCollection = this.collectionsService.deleteOne({ id });
    return deletedCollection;
  }
}
