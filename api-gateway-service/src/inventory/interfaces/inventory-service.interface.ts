import { Observable } from 'rxjs';
import { CreateInventoryDto } from './create-inventory.interface';
import { DeleteInventoryDto } from './deleted-inventory-output';
import { InventoryByItemId } from './inventory-by-item-id.interface';
import { Inventory } from './inventory.interface';
import { UpdateInventoryDto } from './update-inventory.interface';

export interface IInventoryService {
  findOne(data: InventoryByItemId): Observable<Inventory>;
  postOne(data: CreateInventoryDto): Observable<Inventory>;
  deleteOne(data: InventoryByItemId): Observable<DeleteInventoryDto>;
  updateOne(data: UpdateInventoryDto): Observable<Inventory>;
}
