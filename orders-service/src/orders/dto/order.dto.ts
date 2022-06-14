export class Order {
  orderId: string;
  userId: string;
  varietyOfItems: number;
  totalPrice: number;
  itemInOrder: ItemInOrder[];
  createdAt: string;
  updatedAt: string;
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
