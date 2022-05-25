import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserGetOptions } from '../users/interfaces/user-get-options.interface';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 5),
      },
      select: {
        userId: true,
        username: true,
        email: true,
        userRole: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async validateUser(
    options: Partial<UserGetOptions>,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findUser(options, true);
    if (!user || !user.password) {
      throw new UnauthorizedException({
        message: 'Invalid login or password.',
      });
    }
    const isValidated = await this.validatePassword(pass, user.password);
    if (user && isValidated) {
      return user;
    }
    return null;
  }

  private async generateToken(user: Partial<User>): Promise<string> {
    const payload = { uid: user.userId };
    return this.jwtService.sign(payload);
  }

  private async validatePassword(
    incomePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(incomePassword, hashedPassword);
  }
}
