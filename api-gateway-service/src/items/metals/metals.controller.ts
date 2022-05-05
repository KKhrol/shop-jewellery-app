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
import { Observable, toArray } from 'rxjs';
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
  ): Observable<Metal> {
    updateMetalDto.id = id;
    const metalUpdated = this.itemsService.updateMetal(updateMetalDto);
    return metalUpdated;
  }

  @Delete(':id')
  deleteMetal(@Param('id') id: string): Observable<DeleteMetalDto> {
    return this.itemsService.deleteMetal({ id });
  }

  @Post()
  addMetal(@Body() createMetalDto: CreateMetalDto): Observable<Metal> {
    const metalAdded = this.itemsService.addMetal(createMetalDto);
    return metalAdded;
  }

  @Get()
  findMetals(): Observable<Metal[]> {
    const stream = this.itemsService.findMetals();
    return stream.pipe(toArray());
  }
}