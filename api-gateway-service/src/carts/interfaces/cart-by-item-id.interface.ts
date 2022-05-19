import { IsUUID } from 'class-validator';
export class CartByItemId {
  @IsUUID()
  userId: string;

  @IsUUID()
  itemId: string;
}
