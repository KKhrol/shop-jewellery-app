export interface Cart {
  userId: string;
  itemInCart: ItemInCart[];
  varietyOfItems: number;
  totalPrice: number;
}

interface ItemInCart {
  id: string;
  image: string;
  itemName: string;
  description: string;
  metalImage: string;
  price: number;
  quantity: number;
}
