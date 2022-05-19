import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateMetalDto {
  @IsString()
  @MinLength(3, {
    message: 'Name of the metal is too short.',
  })
  @MaxLength(20, {
    message: 'Name of the metal is too long.',
  })
  name: string;

  @IsUrl()
  image: string;

  @IsString()
  @MinLength(20, {
    message: 'Care description is too short.',
  })
  @MaxLength(500, {
    message: 'Care description is too long.',
  })
  care: string;
}
