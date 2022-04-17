export interface Cart {
  userId: string;
  itemInCart: ItemInCart[];
}

interface ItemInCart {
  itemId: string;
  quantity: number;
}
