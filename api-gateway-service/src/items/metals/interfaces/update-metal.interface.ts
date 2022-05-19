import {
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateMetalDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Name of the metal is too short.',
  })
  @MaxLength(20, {
    message: 'Name of the metal is too long.',
  })
  name?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, {
    message: 'Care description is too short.',
  })
  @MaxLength(500, {
    message: 'Care description is too long.',
  })
  care?: string;
}
