import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { ResponseError } from '../common-interfaces/response-error.interface';
import { IInventoryService } from './interfaces/inventory-service.interface';
import { Inventory } from './interfaces/inventory.interface';

@Controller('inventory')
export class InventoryController implements OnModuleInit {
  constructor(
    @Inject('INVENTORY_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  private inventoryService: IInventoryService;
  onModuleInit() {
    this.inventoryService = this.client.getService<IInventoryService>(
      'InventoryController',
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Observable<ResponseData<Inventory> | ResponseError> {
    return this.inventoryService.findOne({ id });
  }
}
