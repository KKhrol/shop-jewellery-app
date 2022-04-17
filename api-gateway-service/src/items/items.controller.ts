import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IItemsService } from './interfaces/item-service.interface';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController implements OnModuleInit {
  constructor(@Inject('ITEM_PACKAGE') private readonly client: ClientGrpc) {}

  private itemsService: IItemsService;
  onModuleInit() {
    this.itemsService = this.client.getService<IItemsService>('ItemsService');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Item> {
    return this.itemsService.findOne({ id });
  }
}
