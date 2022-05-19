import { IsInt, IsString, Min } from 'class-validator';

export class SortAngPaginateItems {
  @IsInt()
  @Min(0)
  numberOfPage: number;
  @IsString()
  sortByField: string;
}
