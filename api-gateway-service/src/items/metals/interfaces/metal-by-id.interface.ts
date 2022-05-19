import { IsUUID } from 'class-validator';

export class MetalById {
  @IsUUID()
  id: string;
}
