import { Observable } from 'rxjs';
import { DeleteItemDto } from '../../items/interfaces/deleted-item-output.interface';
import { CartById } from './cart-by-id.interface';
import { CartByItemId } from './cart-by-item-id.interface';
import { CartByUserId } from './cart-by-user-id.interface';
import { Cart } from './cart.interface';
import { CreateItemInCartDto } from './create-item-in-cart.interface';
import { UpdateCartDto } from './update-cart.interface';

export interface ICartsService {
  findOne(data: CartByUserId): Observable<Cart>;
  updateOne(data: UpdateCartDto): Observable<Cart>;
  deleteItemFromCart(data: CartByItemId): Observable<DeleteItemDto>;
  clearCart(data: CartByUserId): Observable<DeleteItemDto>;
  deleteItem(data: CartById): Observable<DeleteItemDto>;
  addItem(data: CreateItemInCartDto): Observable<Cart>;
}
