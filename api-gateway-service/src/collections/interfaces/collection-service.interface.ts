import { Observable } from 'rxjs';
import { CreateCollectionDto } from './create-collection.interface';
import { CollectionById } from './collection-by-id.interface';
import { Collection } from './collection.interface';
import { CollectionsOnPage } from './collections-page.interface';
import { UpdateCollectionDto } from './update-collection.interface';
import { DeleteCollectionDto } from './delete-collection.interface';

export interface ICollectionsService {
  findOne(data: CollectionById): Observable<Collection>;

  findMany(data: CollectionsOnPage): Observable<Collection>;

  postOne(data: CreateCollectionDto): Observable<Collection>;

  updateOne(data: UpdateCollectionDto): Observable<Collection>;

  deleteOne(data: CollectionById): Observable<DeleteCollectionDto>;
}
