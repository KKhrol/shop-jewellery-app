import { IsDefined, IsInt, IsPositive, Min } from 'class-validator';

export class CollectionsOnPage {
  @IsDefined()
  @IsInt()
  @Min(0)
  page: number;

  @IsDefined()
  @IsInt()
  @IsPositive()
  itemsPerPage: number;
}
