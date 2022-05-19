import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Name of the item is too short.',
  })
  @MaxLength(100, {
    message: 'Name of the item is too long.',
  })
  itemName?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, {
    message: 'Description is too short.',
  })
  @MaxLength(300, {
    message: 'Description is too long.',
  })
  description?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  price?: number;
}
