import { IsUUID } from 'class-validator';

export class ItemById {
  @IsUUID()
  id: string;
}
