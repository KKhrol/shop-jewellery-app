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
  UseFilters,
  UseGuards,
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
import { UpdateItemAndInventoryDto } from '../common-interfaces/update-item-and-inventory.interface';
import { CreateReviewDto } from '../reviews/interfaces/create-review.interface';
import { UpdateReviewDto } from '../reviews/interfaces/update-review.interface';
import { ItemOutputDto } from './interfaces/item-output.interface';
import { ICartsService } from '../carts/interfaces/cart-service.interface';
import { Cart } from '../carts/interfaces/cart.interface';
import { AddItemInCartDto } from '../common-interfaces/add-item-in-cart.interface';
import { ItemInCart } from '../common-interfaces/item-in-cart.interface';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { ResponseError } from '../common-interfaces/response-error.interface';
import { HttpExceptionFilter } from '../filters/exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user.decorator';

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController implements OnModuleInit {
  constructor(
    @Inject('ITEM_PACKAGE') private readonly clientItem: ClientGrpc,
    @Inject('REVIEW_PACKAGE') private readonly clientReview: ClientGrpc,
    @Inject('INVENTORY_PACKAGE') private readonly clientInventory: ClientGrpc,
    @Inject('CART_PACKAGE') private readonly clientCart: ClientGrpc,
  ) {}

  private itemsService: IItemsService;
  private reviewsService: IReviewsService;
  private inventoryService: IInventoryService;
  private cartsService: ICartsService;
  onModuleInit() {
    this.itemsService =
      this.clientItem.getService<IItemsService>('ItemsController');
    this.reviewsService =
      this.clientReview.getService<IReviewsService>('ReviewsController');
    this.inventoryService = this.clientInventory.getService<IInventoryService>(
      'InventoryController',
    );
    this.cartsService =
      this.clientCart.getService<ICartsService>('CartsController');
  }

  @Get(':id')
  getItemInfo(
    @Param('id') id: string,
  ): Observable<
    [
      ResponseData<Item> | ResponseError,
      ResponseData<Inventory> | ResponseError,
      ResponseData<Review> | ResponseError,
    ]
  > {
    const reviews = this.reviewsService.findOne({ id });
    const stock = this.inventoryService.findOne({ id });
    const itemInfo = this.itemsService.findOne({ id });
    return forkJoin([itemInfo, stock, reviews]);
  }

  @Post(':id/inventories')
  addItemInventory(
    @Param('id') itemId: string,
    @Body() inventory: Inventory,
  ): Observable<
    [
      ResponseData<Item> | ResponseError,
      ResponseData<Inventory> | ResponseError,
    ]
  > {
    const stock = this.inventoryService.postOne({
      id: itemId,
      quantity: inventory.quantity,
    });
    const itemInfo = this.itemsService.findOne({ id: itemId });
    return forkJoin([itemInfo, stock]);
  }

  @Post(':id/reviews')
  addItemReview(
    @Param('id') itemId: string,
    @Body() createReview: CreateReviewDto,
  ): Observable<ResponseData<Review> | ResponseError> {
    createReview.itemId = itemId;
    const reviewAdded = this.reviewsService.addOne(createReview);
    return reviewAdded;
  }

  @Post(':id/carts')
  addItemInCart(
    @Param('id') itemId: string,
    @User('userId') userId: string,
    @Body() addItemInCart: AddItemInCartDto,
  ): Observable<ResponseData<Cart> | ResponseError> {
    addItemInCart.itemId = itemId;
    addItemInCart.userId = userId;
    const itemCreated = this.cartsService.addItem(addItemInCart);
    return itemCreated;
  }

  @Put(':id/reviews')
  updateItemReview(
    @Param('id') itemId: string,
    @Body() updateReview: UpdateReviewDto,
  ): Observable<ResponseData<Review> | ResponseError> {
    updateReview.itemId = itemId;
    const reviewUpdated = this.reviewsService.updateOne(updateReview);
    return reviewUpdated;
  }

  @Delete(':id')
  deleteItem(
    @Param('id') id: string,
  ): Observable<
    [DeleteReviewDto, DeleteInventoryDto, DeleteItemDto, DeleteItemDto]
  > {
    const reviewsDeletedMessage = this.reviewsService.deleteOne({ id });
    const stockDeletedMessage = this.inventoryService.deleteOne({ id });
    const itemDeletedMessage = this.itemsService.deleteOne({ id });
    const cartDeletedMessage = this.cartsService.deleteItem({ id });
    return forkJoin([
      reviewsDeletedMessage,
      stockDeletedMessage,
      itemDeletedMessage,
      cartDeletedMessage,
    ]);
  }

  @Put(':id')
  updateItem(
    @Param('id') id: string,
    @Body() data: UpdateItemAndInventoryDto,
  ): Observable<
    [
      ResponseData<ItemOutputDto> | ResponseError,
      ResponseData<Inventory> | ResponseError,
      ResponseData<ItemInCart> | ResponseError,
    ]
  > {
    const updateItemDto = {
      name: data.name,
      descriptionJewellery: data.descriptionJewellery,
      collectionId: data.collectionId,
      price: data.price,
      descriptionItem: data.descriptionItem,
      delivery: data.delivery,
      images: data.images,
      id: id,
    };
    const updatedItem = this.itemsService.updateOne(updateItemDto);

    const updatedInventory = this.inventoryService.updateOne({
      id: id,
      quantity: data.quantity,
    });

    const updatedItemInCart = this.cartsService.updateItem({
      id,
      image: data.images[0],
      itemName: data.name,
      description: data.descriptionItem,
      price: data.price,
    });

    return forkJoin([updatedItem, updatedInventory, updatedItemInCart]);
  }
}
