import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfValidImages } from '../decorators/images-array-validation.decorator';

export class UpdateItemAndInventoryDto {
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Name of the item is too short',
  })
  @MaxLength(100, {
    message: 'Name of the item is too long',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, {
    message: 'Description of the jewellery is too short.',
  })
  @MaxLength(300, {
    message: 'Description of the jewellery is too long.',
  })
  descriptionJewellery?: string;

  @IsOptional()
  @IsUUID()
  collectionId?: string;

  @IsInt()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  @MinLength(20, {
    message: 'Description of the item is too short.',
  })
  @MaxLength(300, {
    message: 'Description of the item is too long.',
  })
  descriptionItem?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, {
    message: 'Delivery description is too short.',
  })
  @MaxLength(300, {
    message: 'Delivery description is too long.',
  })
  delivery?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsArrayOfValidImages({
    message: 'The images or one of the image not valid',
  })
  images?: string[];

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}
