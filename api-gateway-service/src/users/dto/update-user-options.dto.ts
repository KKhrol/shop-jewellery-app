import { Role } from '@prisma/client';
/*import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';*/

export class UpdateUserDto {
  /*@IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short',
  })
  @MaxLength(30, {
    message: 'Username is too long',
  })*/
  username?: string;

  /* @IsOptional()
  @IsString()
  @IsEmail()*/
  email?: string;

  /* @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Password is too short',
  })
  @MaxLength(30, {
    message: 'Password is too long',
  })*/
  password?: string;

  /*@IsOptional()
  @IsString()*/
  resetCode?: string;

  /*@IsOptional()
  @IsString()
  @IsIn([Role.USER, Role.ADMIN])*/
  userRole?: Role;

  /*@IsOptional()
  @IsBoolean()*/
  deleted?: boolean;
}
