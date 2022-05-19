import { IsUUID } from 'class-validator';

export class DeleteItemInOrderDto {
  @IsUUID()
  orderId: string;
  @IsUUID()
  itemId: string;
}
