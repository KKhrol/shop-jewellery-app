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
import { ResponseData } from '../../common-interfaces/response-data.interface';
import { ResponseError } from '../../common-interfaces/response-error.interface';

export interface IOrdersService {
  findOrder(
    data: GetOrderByIdDto,
  ): Observable<ResponseData<Order> | ResponseError>;
  createOrder(
    data: CreateOrderDto,
  ): Observable<ResponseData<Order> | ResponseError>;
  findOrders(
    data: GetOrdersDto,
  ): Observable<ResponseData<OrderInList[]> | ResponseError>;
  updateOrder(
    data: UpdateOrderDto,
  ): Observable<ResponseData<Order> | ResponseError>;
  deleteItem(
    data: DeleteItemInOrderDto,
  ): Observable<ResponseData<DeleteItemDto> | ResponseError>;
  deleteOrder(
    data: DeleteOrderDto,
  ): Observable<ResponseData<DeletedOrderOutputDto> | ResponseError>;
}
