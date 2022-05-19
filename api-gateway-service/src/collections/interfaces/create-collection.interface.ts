import {
  IsDefined,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCollectionDto {
  @IsDefined()
  @IsString()
  @MinLength(1, {
    message: 'Name of the collection is too short',
  })
  @MaxLength(100, {
    message: 'Name of the collection is too long',
  })
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(20, {
    message: 'Description is too short',
  })
  @MaxLength(300, {
    message: 'Description is too long',
  })
  description: string;

  @IsDefined()
  @IsUrl()
  image: string;
}
