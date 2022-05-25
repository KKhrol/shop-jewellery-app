import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short',
  })
  @MaxLength(30, {
    message: 'Username is too long',
  })
  username: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @MaxLength(30, {
    message: 'Password is too long',
  })
  @Matches('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*d)(?=.*[!#$%&?_ "]).*$')
  password: string;
}
