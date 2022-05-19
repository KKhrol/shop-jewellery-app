import { IsUUID } from 'class-validator';
export class CartById {
  @IsUUID()
  id: string;
}
