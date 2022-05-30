import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserFullInfo } from '../users/interfaces/user-full-info.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Partial<UserFullInfo>> {
    const user = await this.authService.validateUser(
      { username: username },
      password,
    );
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid username or password.',
      });
    }
    return user;
  }
}
