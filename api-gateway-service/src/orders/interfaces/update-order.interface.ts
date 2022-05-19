import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @IsInt()
  @Min(1)
  @Max(99)
  discount: number;
}
