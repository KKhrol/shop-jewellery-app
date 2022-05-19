import { IsBoolean, IsInt, IsUUID, Min } from 'class-validator';

export class GetOrdersDto {
  @IsUUID()
  userId: string;

  @IsInt()
  @Min(0)
  page: number;

  @IsInt()
  @Min(1)
  ordersPerPage: number;

  @IsBoolean()
  deleted: boolean;
}
