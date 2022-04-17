import { Observable } from 'rxjs';
import { CartByUserId } from './cart-by-id.interface';
import { Cart } from './cart.interface';

export interface ICartsService {
  findOne(data: CartByUserId): Observable<Cart>;
}
