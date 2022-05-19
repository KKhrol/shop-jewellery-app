import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class ItemByMetal {
  @IsUUID()
  itemId: string;

  @IsString()
  @MinLength(3, {
    message: 'Name of the metal is too short.',
  })
  @MaxLength(20, {
    message: 'Name of the metal is too long.',
  })
  metalName: string;
}
