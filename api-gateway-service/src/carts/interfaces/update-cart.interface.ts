import {
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  itemId?: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  quantity: number;
}
