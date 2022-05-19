import { IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  @Min(0)
  @Max(5.0)
  mark: number;
}
