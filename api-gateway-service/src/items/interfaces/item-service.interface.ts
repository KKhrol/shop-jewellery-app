import { Observable } from 'rxjs';
import { CreateItemDto } from './create-item.interface';
import { ItemOutputDto } from './item-output.interface';
import { DeleteItemDto } from './deleted-item-output.interface';
import { ItemById } from './item-by-id.interface';
import { ItemInCollection } from './item-in-collection.interface';
import { Item } from './item.interface';
import { ItemsOnPage } from './items-page.interface';
import { UpdateItemDto } from './update-item.interface';
import { UpdateMetalDto } from '../metals/interfaces/update-metal.interface';
import { Metal } from '../metals/interfaces/metal.interface';
import { MetalById } from '../metals/interfaces/metal-by-id.interface';
import { DeleteMetalDto } from '../metals/interfaces/deleted-metal-output.interface';
import { CreateMetalDto } from '../metals/interfaces/create-metal.interface';
//import { ItemByMetal } from './item-by-metal.interface';

export interface IItemsService {
  findOne(data: ItemById): Observable<Item>;
  findMany(data: ItemsOnPage): Observable<ItemInCollection>;
  postOne(data: CreateItemDto): Observable<ItemOutputDto>;
  deleteOne(data: ItemById): Observable<DeleteItemDto>;
  updateOne(data: UpdateItemDto): Observable<ItemOutputDto>;
  updateMetal(data: UpdateMetalDto): Observable<Metal>;
  deleteMetal(data: MetalById): Observable<DeleteMetalDto>;
  addMetal(data: CreateMetalDto): Observable<Metal>;
  findMetals(): Observable<Metal>;
  //findOneByMetal(data: ItemByMetal): Observable<Item>;
}
