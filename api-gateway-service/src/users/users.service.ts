import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFullInfo } from './interfaces/user-full-info.interface';
import { User } from './interfaces/user.interface';
import { UserGetOptions } from './interfaces/user-get-options.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<User[] | null> {
    return this.prisma.user.findMany({
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

  async findUser(
    options: Partial<UserGetOptions>,
    allowed = false,
  ): Promise<Partial<UserFullInfo> | null> {
    return this.prisma.user.findUnique({
      where: options,
      select: {
        userId: true,
        username: true,
        email: true,
        password: allowed,
        userRole: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: string): Promise<UserFullInfo> {
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        deleted: true,
      },
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        username: data.username,
        email: data.email,
      },
    });
  }

  async updateUserRole(id: string, data: UpdateUserRoleDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        userRole: data.userRole,
      },
    });
  }
  //async updatePassword(): Promise<string> {}
}
