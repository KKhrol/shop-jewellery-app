import { Observable } from 'rxjs';
import { CreateItemDto } from './create-item.interface';
import { ItemOutputDto } from './item-output.interface';
import { DeleteItemDto } from './deleted-item-output.interface';
import { ItemById } from './item-by-id.interface';
import { ItemInCollection } from './item-in-collection.interface';
import { Item } from './item.interface';
import { ItemsOnPage } from './items-page.interface';
import { UpdateItemDto } from './update-item.interface';

export interface IItemsService {
  findOne(data: ItemById): Observable<Item>;
  findMany(data: ItemsOnPage): Observable<ItemInCollection>;
  postOne(data: CreateItemDto): Observable<ItemOutputDto>;
  deleteOne(data: ItemById): Observable<DeleteItemDto>;
  updateOne(data: UpdateItemDto): Observable<ItemOutputDto>;
}
