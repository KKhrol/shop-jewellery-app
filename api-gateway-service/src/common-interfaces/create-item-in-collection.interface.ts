import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfValidImages } from '../decorators/images-array-validation.decorator';

export class CreateItemInCollection {
  @IsDefined({ message: 'Name of the item is required.' })
  @IsString()
  @MinLength(1, {
    message: 'Name of the item is too short.',
  })
  @MaxLength(100, {
    message: 'Name of the item is too long.',
  })
  name: string;

  @IsDefined({ message: 'Description of the jewellery is required.' })
  @IsString()
  @MinLength(20, {
    message: 'Description of the jewellery is too short.',
  })
  @MaxLength(300, {
    message: 'Description of the jewellery is too long.',
  })
  descriptionJewellery: string;

  @IsDefined({ message: 'Name of the metal is required.' })
  @IsString()
  @MinLength(3, {
    message: 'Name of the metal is too short.',
  })
  @MaxLength(50, {
    message: 'Name of the metal is too long.',
  })
  metalName: string;

  @IsDefined({ message: 'Metal image is required.' })
  @IsUrl()
  metalImage: string;

  @IsDefined({ message: 'Care description is required.' })
  @IsString()
  @MinLength(5, {
    message: 'Care description is too short.',
  })
  @MaxLength(500, {
    message: 'Care description is too long.',
  })
  care: string;

  @IsDefined({ message: 'Price is required.' })
  @IsInt()
  @IsPositive()
  price: number;

  @IsDefined({ message: 'Item description is required.' })
  @IsString()
  @MinLength(20, {
    message: 'Description of the item is too short.',
  })
  @MaxLength(300, {
    message: 'Description of the item is too long.',
  })
  descriptionItem: string;

  @IsDefined({ message: 'Delivery description is required.' })
  @IsString()
  @MinLength(20, {
    message: 'Delivery description is too short.',
  })
  @MaxLength(300, {
    message: 'Delivery description is too long.',
  })
  delivery: string;

  @IsDefined({ message: 'The images of item are required.' })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsArrayOfValidImages({
    message: 'The images or one of the image not valid',
  })
  images: string[];

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}
