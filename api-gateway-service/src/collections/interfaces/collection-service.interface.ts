import { Observable } from 'rxjs';
import { CollectionById } from './collection-by-id.interface';
import { Collection } from './collection.interface';

export interface ICollectionsService {
  findOne(data: CollectionById): Observable<Collection>;
}
