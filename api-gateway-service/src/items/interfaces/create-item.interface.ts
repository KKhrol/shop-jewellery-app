import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfValidImages } from '../../decorators/images-array-validation.decorator';

export class CreateItemDto {
  @IsString()
  @MinLength(1, {
    message: 'Name of the item is too short.',
  })
  @MaxLength(100, {
    message: 'Name of the item is too long.',
  })
  name: string;

  @IsString()
  @MinLength(20, {
    message: 'Description of the jewellery is too short.',
  })
  @MaxLength(300, {
    message: 'Description of the jewellery is too long.',
  })
  descriptionJewellery: string;

  @IsOptional()
  @IsUUID()
  collectionId?: string;

  @IsString()
  @MinLength(3, {
    message: 'Name of the metal is too short.',
  })
  @MaxLength(20, {
    message: 'Name of the metal is too long.',
  })
  metalName: string;

  @IsUrl()
  metalImage: string;

  @IsString()
  @MinLength(20, {
    message: 'Care description is too short.',
  })
  @MaxLength(500, {
    message: 'Care description is too long.',
  })
  care: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(20, {
    message: 'Description of the item is too short.',
  })
  @MaxLength(300, {
    message: 'Description of the item is too long.',
  })
  descriptionItem: string;

  @IsString()
  @MinLength(20, {
    message: 'Delivery description is too short.',
  })
  @MaxLength(300, {
    message: 'Delivery description is too long.',
  })
  delivery: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsArrayOfValidImages({
    message: 'The images or one of the image not valid',
  })
  images: string[];
}
