import { Observable } from 'rxjs';
import { ResponseData } from '../../common-interfaces/response-data.interface';
import { ResponseError } from '../../common-interfaces/response-error.interface';
import { CreateInventoryDto } from './create-inventory.interface';
import { DeleteInventoryDto } from './deleted-inventory-output';
import { InventoryByItemId } from './inventory-by-item-id.interface';
import { Inventory } from './inventory.interface';
import { UpdateInventoryDto } from './update-inventory.interface';

export interface IInventoryService {
  findOne(
    data: InventoryByItemId,
  ): Observable<ResponseData<Inventory> | ResponseError>;
  postOne(
    data: CreateInventoryDto,
  ): Observable<ResponseData<Inventory> | ResponseError>;
  deleteOne(
    data: InventoryByItemId,
  ): Observable<ResponseData<DeleteInventoryDto> | ResponseError>;
  updateOne(
    data: UpdateInventoryDto,
  ): Observable<ResponseData<Inventory> | ResponseError>;
}
