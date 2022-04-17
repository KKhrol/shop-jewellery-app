export interface Order {
  orderId: string;
  userId: string;
  summary: number;
  itemInOrder: ItemInOrder[];
}

interface ItemInOrder {
  itemId: string;
  quantity: number;
}
