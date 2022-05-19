import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  @Min(0)
  @Max(5.0)
  mark: number;

  @IsUrl()
  image: string;

  @IsString()
  @MinLength(1, {
    message: 'Name of the item is too short.',
  })
  @MaxLength(100, {
    message: 'Name of the item is too long.',
  })
  name: string;

  @IsUrl()
  metalImage: string;
}
