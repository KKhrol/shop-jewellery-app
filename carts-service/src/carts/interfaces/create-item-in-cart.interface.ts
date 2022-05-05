export interface CreateItemInCartDto {
  itemId?: string;
  userId: string;
  image: string;
  itemName: string;
  description: string;
  metalImage: string;
  price: number;
}
