import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short',
  })
  @MaxLength(30, {
    message: 'Username is too long',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}
