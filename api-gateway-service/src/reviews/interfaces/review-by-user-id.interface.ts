import { IsUUID } from 'class-validator';

export class ReviewByUserId {
  @IsUUID()
  userId: string;
}
