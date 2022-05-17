import { Observable } from 'rxjs';
import { ItemInCart } from '../../common-interfaces/item-in-cart.interface';
import { AddItemInCartDto } from '../../common-interfaces/add-item-in-cart.interface';
import { CreateItemDto } from '../../common-interfaces/create-item-in-cart.interface';
import { UpdateItemDto } from '../../common-interfaces/update-item-in-cart.interface';
import { DeleteItemDto } from '../../items/interfaces/deleted-item-output.interface';
import { CartById } from './cart-by-id.interface';
import { CartByItemId } from './cart-by-item-id.interface';
import { CartByUserId } from './cart-by-user-id.interface';
import { Cart } from './cart.interface';
import { UpdateCartDto } from './update-cart.interface';
import { ResponseError } from '../../common-interfaces/response-error.interface';
import { ResponseData } from '../../common-interfaces/response-data.interface';

export interface ICartsService {
  findCart(data: CartByUserId): Observable<ResponseData<Cart> | ResponseError>;
  updateCart(
    data: UpdateCartDto,
  ): Observable<ResponseData<Cart> | ResponseError>;
  deleteItemFromCart(
    data: CartByItemId,
  ): Observable<ResponseData<Cart> | ResponseError>;
  clearCart(
    data: CartByUserId,
  ): Observable<ResponseData<DeleteItemDto> | ResponseError>;
  deleteItem(
    data: CartById,
  ): Observable<ResponseData<DeleteItemDto> | ResponseError>;
  addItem(
    data: AddItemInCartDto,
  ): Observable<ResponseData<Cart> | ResponseError>;
  updateItem(
    data: UpdateItemDto,
  ): Observable<ResponseData<ItemInCart> | ResponseError>;
  createItem(
    data: CreateItemDto,
  ): Observable<ResponseData<ItemInCart> | ResponseError>;
}
