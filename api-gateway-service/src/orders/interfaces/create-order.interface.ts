export interface CreateOrderDto {
  userId: string;
  itemInOrder: ItemInOrder[];
  totalPrice: number;
}

interface ItemInOrder {
  itemId: string;
  image: string;
  name: string;
  description: string;
  metalImage: string;
  price: number;
  quantity: number;
}
