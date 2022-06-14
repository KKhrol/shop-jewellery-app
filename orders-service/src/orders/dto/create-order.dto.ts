export class CreateOrderDto {
  userId: string;
  itemInOrder: ItemInOrder[];
  totalPrice: number;
}

export class ItemInOrder {
  itemId: string;
  image: string;
  name: string;
  description: string;
  metalImage: string;
  price: number;
  quantity: number;
}
