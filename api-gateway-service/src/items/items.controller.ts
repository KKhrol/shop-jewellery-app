import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { forkJoin, Observable } from 'rxjs';
import { DeleteInventoryDto } from '../inventory/interfaces/deleted-inventory-output';
import { Inventory } from '../inventory/interfaces/inventory.interface';
import { DeleteReviewDto } from '../reviews/interfaces/deleted-review-output.interface';
import { Review } from '../reviews/interfaces/review.interface';
import { IInventoryService } from '../inventory/interfaces/inventory-service.interface';
import { IReviewsService } from '../reviews/interfaces/review-service.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { IItemsService } from './interfaces/item-service.interface';
import { Item } from './interfaces/item.interface';
import { UpdateItemDto } from './interfaces/update-item.interface';
import { UpdateItemAndInventoryDto } from '../common-interfaces/update-item-and-inventory.interface';

@Controller('items')
export class ItemsController implements OnModuleInit {
  constructor(
    @Inject('ITEM_PACKAGE') private readonly clientItem: ClientGrpc,
    @Inject('REVIEW_PACKAGE') private readonly clientReview: ClientGrpc,
    @Inject('INVENTORY_PACKAGE') private readonly clientInventory: ClientGrpc,
  ) {}

  private itemsService: IItemsService;
  private reviewsService: IReviewsService;
  private inventoryService: IInventoryService;
  onModuleInit() {
    this.itemsService =
      this.clientItem.getService<IItemsService>('ItemsController');
    this.reviewsService =
      this.clientReview.getService<IReviewsService>('ReviewsController');
    this.inventoryService = this.clientInventory.getService<IInventoryService>(
      'InventoryController',
    );
  }

  @Get(':id')
  getItemInfo(@Param('id') id: string): Observable<[Item, Inventory, Review]> {
    const reviews = this.reviewsService.findOne({ id });
    const stock = this.inventoryService.findOne({ id });
    const itemInfo = this.itemsService.findOne({ id });
    return forkJoin([itemInfo, stock, reviews]);
  }

  @Post(':id')
  addItemInventory(
    @Param('id') itemId: string,
    @Body() inventory: Inventory,
  ): Observable<[Item, Inventory]> {
    const stock = this.inventoryService.postOne({
      id: itemId,
      quantity: inventory.quantity,
    });
    const itemInfo = this.itemsService.findOne({ id: itemId });
    return forkJoin([itemInfo, stock]);
  }

  @Delete(':id')
  deleteItem(
    @Param('id') id: string,
  ): Observable<[DeleteReviewDto, DeleteInventoryDto, DeleteItemDto]> {
    const reviewsDeletedMessage = this.reviewsService.deleteOne({ id });
    const stockDeletedMessage = this.inventoryService.deleteOne({ id });
    const itemDeletedMessage = this.itemsService.deleteOne({ id });
    return forkJoin([
      reviewsDeletedMessage,
      stockDeletedMessage,
      itemDeletedMessage,
    ]);
  }

  @Put(':id')
  updateItem(
    @Param('id') id: string,
    @Body() updateItemAndInventoryDto: UpdateItemAndInventoryDto,
  ) {
    const updateItemDto: UpdateItemDto = updateItemAndInventoryDto;
    updateItemDto.id = id;
    const updatedItem = this.itemsService.updateOne(updateItemDto);

    let updatedInventory: Observable<Inventory>;
    if (updateItemAndInventoryDto.quantity) {
      updatedInventory = this.inventoryService.updateOne({
        id: id,
        quantity: updateItemAndInventoryDto.quantity,
      });
    }
    return forkJoin([updatedItem, updatedInventory]);
  }
}
