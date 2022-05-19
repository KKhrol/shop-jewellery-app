import { IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class UpdateInventoryDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}
