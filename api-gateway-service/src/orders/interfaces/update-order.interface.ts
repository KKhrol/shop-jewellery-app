import {
  IsDefined,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(99)
  discount: number;

  @IsDefined()
  @IsInt()
  @Min(1)
  oldTotalPrice: number;
}
