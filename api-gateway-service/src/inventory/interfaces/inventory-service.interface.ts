import { Observable } from 'rxjs';
import { InventoryByItemId } from './inventory-by-item-id.interface';
import { Inventory } from './inventory.interface';

export interface IInventoryService {
  findOne(data: InventoryByItemId): Observable<Inventory>;
}
