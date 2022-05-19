import { IsDefined, IsInt } from 'class-validator';

export class Inventory {
  @IsDefined()
  @IsInt()
  quantity: number;
}
