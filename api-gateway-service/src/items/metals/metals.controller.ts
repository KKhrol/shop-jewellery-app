import {
  Controller,
  Put,
  Inject,
  OnModuleInit,
  Body,
  Param,
  Delete,
  Post,
  Get,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseData } from '../../common-interfaces/response-data.interface';
import { ResponseError } from '../../common-interfaces/response-error.interface';
import { IItemsService } from '../interfaces/item-service.interface';
import { CreateMetalDto } from './interfaces/create-metal.interface';
import { DeleteMetalDto } from './interfaces/deleted-metal-output.interface';
import { Metal } from './interfaces/metal.interface';
import { UpdateMetalDto } from './interfaces/update-metal.interface';

@Controller('metals')
export class MetalsController implements OnModuleInit {
  constructor(
    @Inject('ITEM_PACKAGE') private readonly clientItem: ClientGrpc,
  ) {}
  private itemsService: IItemsService;
  onModuleInit() {
    this.itemsService =
      this.clientItem.getService<IItemsService>('ItemsController');
  }

  @Put(':id')
  updateMetal(
    @Param('id') id: string,
    @Body() updateMetalDto: UpdateMetalDto,
  ): Observable<ResponseData<Metal> | ResponseError> {
    updateMetalDto.id = id;
    const metalUpdated = this.itemsService.updateMetal(updateMetalDto);
    return metalUpdated;
  }

  @Delete(':id')
  deleteMetal(
    @Param('id') id: string,
  ): Observable<ResponseData<DeleteMetalDto> | ResponseError> {
    return this.itemsService.deleteMetal({ id });
  }

  @Post()
  addMetal(
    @Body() createMetalDto: CreateMetalDto,
  ): Observable<ResponseData<Metal> | ResponseError> {
    const metalAdded = this.itemsService.addMetal(createMetalDto);
    return metalAdded;
  }

  @Get()
  findMetals(): Observable<ResponseData<Metal[]> | ResponseError> {
    return this.itemsService.findMetals();
  }
}
