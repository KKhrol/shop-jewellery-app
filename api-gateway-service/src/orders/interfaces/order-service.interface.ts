import { Observable } from 'rxjs';
import { CreateOrderDto } from './create-order.interface';
import { DeleteItemInOrderDto } from '../../common-interfaces/delete-item-in-order.interface';
import { DeleteItemDto } from '../../items/interfaces/deleted-item-output.interface';
import { DeleteOrderDto } from './delete-order.interface';
import { DeletedOrderOutputDto } from './deleted-order-output.interface';
import { GetOrderByIdDto } from './get-order-by-id.interface';
import { OrderInList } from './order-in-list.interface';
import { Order } from './order.interface';
import { GetOrdersDto } from './get-orders.interface';
import { UpdateOrderDto } from './update-order.interface';

export interface IOrdersService {
  findOrder(data: GetOrderByIdDto): Observable<Order>;
  createOrder(data: CreateOrderDto): Observable<Order>;
  findOrders(data: GetOrdersDto): Observable<OrderInList>;
  updateOrder(data: UpdateOrderDto): Observable<Order>;
  deleteItem(data: DeleteItemInOrderDto): Observable<DeleteItemDto>;
  deleteOrder(data: DeleteOrderDto): Observable<DeletedOrderOutputDto>;
}
