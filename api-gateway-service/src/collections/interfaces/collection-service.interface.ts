import { Observable } from 'rxjs';
import { CreateCollectionDto } from './create-collection.interface';
import { CollectionById } from './collection-by-id.interface';
import { Collection } from './collection.interface';
import { CollectionsOnPage } from './collections-page.interface';
import { UpdateCollectionDto } from './update-collection.interface';
import { DeleteCollectionDto } from './delete-collection.interface';
import { ResponseData } from '../../common-interfaces/response-data.interface';
import { ResponseError } from '../../common-interfaces/response-error.interface';
import { CollectionFullInfo } from './collection-full-info.interface';

export interface ICollectionsService {
  findOne(
    data: CollectionById,
  ): Observable<ResponseData<CollectionFullInfo> | ResponseError>;

  findMany(
    data: CollectionsOnPage,
  ): Observable<ResponseData<Collection[]> | ResponseError>;

  postCollection(
    data: CreateCollectionDto,
  ): Observable<ResponseData<Collection> | ResponseError>;

  updateOne(
    data: UpdateCollectionDto,
  ): Observable<ResponseData<Collection> | ResponseError>;

  deleteOne(
    data: CollectionById,
  ): Observable<ResponseData<DeleteCollectionDto> | ResponseError>;
}
