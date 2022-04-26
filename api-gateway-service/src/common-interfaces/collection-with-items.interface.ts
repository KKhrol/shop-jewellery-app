import { Collection } from '../collections/interfaces/collection.interface';
import { Observable } from 'rxjs';
import { ItemInCollection } from 'src/items/interfaces/item-in-collection.interface';

export interface CollectionWithItems {
  collection: Observable<Collection>;
  items: Observable<ItemInCollection[]>;
}
