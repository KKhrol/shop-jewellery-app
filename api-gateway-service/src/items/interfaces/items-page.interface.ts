import { IsInt, IsUUID, Min } from 'class-validator';

export class ItemsOnPage {
  @IsInt()
  @Min(0)
  page: number;

  @IsInt()
  @Min(1)
  itemsPerPage: number;

  @IsUUID()
  collectionId: string;
}
