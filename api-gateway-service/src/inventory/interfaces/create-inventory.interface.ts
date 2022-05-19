import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateInventoryDto {
  @IsUUID()
  id: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
