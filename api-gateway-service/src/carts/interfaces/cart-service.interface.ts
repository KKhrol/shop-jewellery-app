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

export interface ICartsService {
  findCart(data: CartByUserId): Observable<Cart>;
  updateCart(data: UpdateCartDto): Observable<Cart>;
  deleteItemFromCart(data: CartByItemId): Observable<Cart>;
  clearCart(data: CartByUserId): Observable<DeleteItemDto>;
  deleteItem(data: CartById): Observable<DeleteItemDto>;
  addItem(data: AddItemInCartDto): Observable<Cart>;
  updateItem(data: UpdateItemDto): Observable<ItemInCart>;
  createItem(data: CreateItemDto): Observable<ItemInCart>;
}
