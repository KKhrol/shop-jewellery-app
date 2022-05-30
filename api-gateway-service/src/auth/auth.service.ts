import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserGetOptions } from '../users/interfaces/user-get-options.interface';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserFullInfo } from 'src/users/interfaces/user-full-info.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }

  async validateUser(
    options: Partial<UserGetOptions>,
    pass: string,
  ): Promise<Partial<UserFullInfo> | null> {
    const user = await this.usersService.findUser(options, true);
    if (!user || !user.password) {
      return null;
    }
    const isValidated = await this.validatePassword(pass, user.password);
    if (user && isValidated) {
      return user;
    }
    return null;
  }

  private async validatePassword(
    incomePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(incomePassword, hashedPassword);
  }

  async login(user: Partial<User>) {
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'SECRET_WORD' }),
    };
  }
}
