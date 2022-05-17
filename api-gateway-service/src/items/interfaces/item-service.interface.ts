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
import { ResponseData } from '../../common-interfaces/response-data.interface';
import { ResponseError } from '../../common-interfaces/response-error.interface';
//import { ItemByMetal } from './item-by-metal.interface';

export interface IItemsService {
  findOne(data: ItemById): Observable<ResponseData<Item> | ResponseError>;
  findMany(
    data: ItemsOnPage,
  ): Observable<ResponseData<ItemInCollection[]> | ResponseError>;
  postOne(
    data: CreateItemDto,
  ): Observable<ResponseData<ItemOutputDto> | ResponseError>;
  deleteOne(
    data: ItemById,
  ): Observable<ResponseData<DeleteItemDto> | ResponseError>;
  updateOne(
    data: UpdateItemDto,
  ): Observable<ResponseData<ItemOutputDto> | ResponseError>;
  updateMetal(
    data: UpdateMetalDto,
  ): Observable<ResponseData<Metal> | ResponseError>;
  deleteMetal(
    data: MetalById,
  ): Observable<ResponseData<DeleteMetalDto> | ResponseError>;
  addMetal(
    data: CreateMetalDto,
  ): Observable<ResponseData<Metal> | ResponseError>;
  findMetals(): Observable<ResponseData<Metal[]> | ResponseError>;
  //findOneByMetal(data: ItemByMetal): Observable<Item>;
}
