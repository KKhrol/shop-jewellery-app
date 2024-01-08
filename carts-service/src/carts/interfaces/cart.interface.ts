export class Cart {
  userId: string;
  itemInCart: ItemInCart[];
  varietyOfItems: number;
  totalPrice: number;
}

export class ItemInCart {
  id: string;
  image: string;
  itemName: string;
  description: string;
  metalImage: string;
  price: number;
  quantity: number;
}
