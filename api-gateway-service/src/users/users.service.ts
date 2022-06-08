import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-options.dto';
import { UserFullInfo } from './interfaces/user-full-info.interface';
import { User } from './interfaces/user.interface';
import { UserGetOptions } from './interfaces/user-get-options.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

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
        resetCode: true,
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

  async updateUser(
    userId: string,
    options: Partial<UpdateUserDto>,
  ): Promise<User> {
    return this.prisma.user.update({
      where: {
        userId,
      },
      data: options,
    });
  }

  async createUser(data: CreateUserDto): Promise<User | null> {
    let createdUser;
    try {
      createdUser = await this.prisma.user.create({
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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this username',
          );
          throw new HttpException(
            {
              message:
                'There is a unique constraint violation, a new user cannot be created with this username',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log('Smth bad happenned!(((((9(9(((');
        throw new HttpException(
          {
            message:
              'Smth bad happenned!:( We are currently fixing this issue.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return createdUser;
  }
}
