import { IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class UpdateCartDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  itemId?: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
