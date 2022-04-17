import { Observable } from 'rxjs';
import { OrderById } from './order-by-id.interface';
import { Order } from './order.interface';

export interface IOrdersService {
  findOne(data: OrderById): Observable<Order>;
}
