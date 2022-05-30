import {
  IsEmpty,
  IsInt,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddItemInCartDto {
  @IsEmpty()
  //@IsUUID()
  itemId?: string;

  @IsEmpty()
  userId?: string;

  @IsUrl()
  image: string;

  @IsString()
  @MinLength(1, {
    message: 'Name of the item is too short',
  })
  @MaxLength(100, {
    message: 'Name of the item is too long',
  })
  itemName: string;

  @IsString()
  @MinLength(20, {
    message: 'Description is too short',
  })
  @MaxLength(300, {
    message: 'Description is too long',
  })
  description: string;

  @IsUrl()
  metalImage: string;

  @IsInt()
  @IsPositive()
  price: number;
}
