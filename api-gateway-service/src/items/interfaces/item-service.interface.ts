import { Observable } from 'rxjs';
import { ItemById } from './item-by-id.interface';
import { Item } from './item.interface';

export interface IItemsService {
  findOne(data: ItemById): Observable<Item>;
}
