import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { forkJoin, Observable } from 'rxjs';
import { Inventory } from 'src/inventory/interfaces/inventory.interface';
import { Review } from 'src/reviews/interfaces/review.interface';
import { IInventoryService } from '../inventory/interfaces/inventory-service.interface';
import { IReviewsService } from '../reviews/interfaces/review-service.interface';
import { IItemsService } from './interfaces/item-service.interface';
import { Item } from './interfaces/item.interface';

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
  findOne(@Param('id') id: string): Observable<[Item, Inventory, Review]> {
    const reviews = this.reviewsService.findOne({ id });
    const stock = this.inventoryService.findOne({ id });
    const itemInfo = this.itemsService.findOne({ id });
    return forkJoin([itemInfo, stock, reviews]);
  }
}
