import {
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCollectionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Name of the collection is too short',
  })
  @MaxLength(100, {
    message: 'Name of the collection is too long',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, {
    message: 'Description is too short',
  })
  @MaxLength(300, {
    message: 'Description is too long',
  })
  description?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
