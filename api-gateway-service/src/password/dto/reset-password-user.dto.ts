import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordUserDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(3, {
    message: 'Password is too short',
  })
  @MaxLength(30, {
    message: 'Password is too long',
  })
  password: string;

  @IsDefined()
  @IsString()
  resetCode: string;
}
