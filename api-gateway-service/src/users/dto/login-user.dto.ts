import { IsDefined } from 'class-validator';

export class LoginUserDto {
  @IsDefined()
  username: string;

  @IsDefined()
  password: string;
}
