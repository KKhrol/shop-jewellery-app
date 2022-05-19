import { IsUUID } from 'class-validator';

export class ReviewByItemId {
  @IsUUID()
  id: string;
}
