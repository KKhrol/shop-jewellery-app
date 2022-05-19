import { IsUUID } from 'class-validator';
export class CartByUserId {
  @IsUUID()
  id: string;
}
