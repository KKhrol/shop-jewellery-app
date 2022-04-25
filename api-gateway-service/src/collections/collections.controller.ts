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
import { Observable, toArray } from 'rxjs';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { ICollectionsService } from './interfaces/collection-service.interface';
import { Collection } from './interfaces/collection.interface';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';

@Controller('collections')
export class CollectionsController implements OnModuleInit {
  constructor(
    @Inject('COLLECTION_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  private collectionsService: ICollectionsService;
  onModuleInit() {
    this.collectionsService = this.client.getService<ICollectionsService>(
      'CollectionsController',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Collection> {
    return this.collectionsService.findOne({ id });
  }

  @Get()
  findMany(@Query('page') numberOfPage: number): Observable<Collection[]> {
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
