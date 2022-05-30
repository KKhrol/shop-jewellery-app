import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserFullInfo } from '../users/interfaces/user-full-info.interface';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }
  serializeUser(
    user: Partial<UserFullInfo>,
    done: CallableFunction,
  ): CallableFunction {
    return done(null, user.userId);
  }
  async deserializeUser(
    userId: string,
    done: CallableFunction,
  ): Promise<CallableFunction> {
    return await this.usersService
      .findUser({ userId })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
