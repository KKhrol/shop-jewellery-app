import { createOrderSchema } from '../schemas/create-order.schema';

import * as yup from 'yup';

/*export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsArrayOfItems()
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
*/
export type CreateOrderDto = yup.InferType<typeof createOrderSchema>;
