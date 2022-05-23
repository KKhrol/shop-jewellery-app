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
  UsePipes,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { forkJoin, Observable } from 'rxjs';
import { IOrdersService } from '../orders/interfaces/order-service.interface';
import { DeleteItemDto } from '../items/interfaces/deleted-item-output.interface';
import { CartByItemId } from './interfaces/cart-by-item-id.interface';
import { CartByUserId } from './interfaces/cart-by-user-id.interface';
import { ICartsService } from './interfaces/cart-service.interface';
import { Cart } from './interfaces/cart.interface';
import { UpdateCartDto } from './interfaces/update-cart.interface';
import { CreateOrderDto } from '../orders/interfaces/create-order.interface';
import { Order } from '../orders/interfaces/order.interface';
import { ResponseData } from '../common-interfaces/response-data.interface';
import {
  isResponseError,
  ResponseError,
} from '../common-interfaces/response-error.interface';
import { createOrderSchema } from '../schemas/create-order.schema';
import { ValidationViaSchemaPipe } from 'src/pipes/validation-via-schema.pipe';

@Controller('carts')
export class CartsController implements OnModuleInit {
  constructor(
    @Inject('CART_PACKAGE') private readonly clientCart: ClientGrpc,
    @Inject('ORDER_PACKAGE') private readonly clientOrder: ClientGrpc,
  ) {}

  private cartsService: ICartsService;
  private ordersService: IOrdersService;
  onModuleInit() {
    this.cartsService =
      this.clientCart.getService<ICartsService>('CartsController');
    this.ordersService =
      this.clientOrder.getService<IOrdersService>('OrdersController');
  }

  @Get()
  getItemsInCart(
    @Body() data: CartByUserId,
  ): Observable<ResponseData<Cart> | ResponseError> {
    return this.cartsService.findCart(data);
  }

  @Put(':id')
  updateCart(
    @Param('id') itemId: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Observable<ResponseData<Cart> | ResponseError> {
    updateCartDto.itemId = itemId;
    return this.cartsService.updateCart(updateCartDto);
  }

  @Delete()
  clearCart(
    @Body() data: CartByUserId,
  ): Observable<ResponseData<DeleteItemDto> | ResponseError> {
    return this.cartsService.clearCart(data);
  }

  @Delete(':id')
  deleteItem(
    @Param('id') itemId: string,
    @Body() data: CartByUserId,
  ): Observable<ResponseData<Cart> | ResponseError> {
    const cartByItemId: CartByItemId = {
      userId: data.id,
      itemId,
    };
    return this.cartsService.deleteItemFromCart(cartByItemId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationViaSchemaPipe(createOrderSchema))
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ):
    | Observable<ResponseData<Order> | ResponseError>
    | Observable<
        [
          ResponseData<Order> | ResponseError,
          ResponseData<DeleteItemDto> | ResponseError,
        ]
      > {
    const orderCreated = this.ordersService.createOrder(createOrderDto);

    orderCreated.subscribe((data: ResponseData<Order> | ResponseError) => {
      if (isResponseError(data)) {
        const cartClearedMessage = this.cartsService.clearCart({
          id: createOrderDto.userId,
        });
        return forkJoin([cartClearedMessage, orderCreated]);
      }
    });
    return orderCreated;
  }
}
