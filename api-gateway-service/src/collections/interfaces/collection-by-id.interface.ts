import { IsDefined, IsUUID } from 'class-validator';

export class CollectionById {
  @IsDefined()
  @IsUUID()
  id: string;
}
