export interface CreateItemDto {
  name: string;
  descriptionJewellery: string;
  collectionId?: string;
  metalName: string;
  metalImage: string;
  care: string;
  price: number;
  descriptionItem: string;
  delivery: string;
  images: string[];
}
