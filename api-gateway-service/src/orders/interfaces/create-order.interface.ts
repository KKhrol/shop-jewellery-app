import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { IsArrayOfItems } from '../../decorators/items-array-validation.decorator';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsArrayOfItems({ message: "The structure of provided items isn't correct." })
  itemInOrder: ItemInOrder[];

  @IsInt()
  @IsPositive()
  totalPrice: number;
}

export class ItemInOrder {
  itemId: string;
  image: string;
  description: string;
  metalImage: string;
  price: number;
  quantity: number;
}
