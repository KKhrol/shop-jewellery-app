import { Observable } from 'rxjs';
import { ItemById } from './item-by-id.interface';
import { ItemInCollection } from './item-in-collection.interface';
import { Item } from './item.interface';
import { ItemsOnPage } from './items-page.interface';

export interface IItemsService {
  findOne(data: ItemById): Observable<Item>;
  findMany(data: ItemsOnPage): Observable<ItemInCollection>;
}
