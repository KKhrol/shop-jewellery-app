import { IsUUID } from 'class-validator';

export class InventoryByItemId {
  @IsUUID()
  id: string;
}
