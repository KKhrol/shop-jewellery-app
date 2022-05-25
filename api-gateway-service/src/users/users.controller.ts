import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/exception.filter';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeletedUserResponse } from './interfaces/user-deleted-output.interface';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UserFullInfo } from './interfaces/user-full-info.interface';

@UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<ResponseData<User[]>> {
    const users = await this.usersService.findAllUsers();

    if (!users) {
      throw new HttpException(
        { message: 'No users found.' },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: 'success',
      message: 'All users found.',
      data: users,
    };
  }

  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ): Promise<ResponseData<Partial<UserFullInfo>>> {
    const user = await this.usersService.findUser({ userId: id });
    if (!user) {
      throw new HttpException(
        { message: "Such user doesn't exist." },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: 'success',
      message: 'User found.',
      data: user,
    };
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<ResponseData<DeletedUserResponse>> {
    const user = await this.usersService.deleteUser(id);
    if (!user.deleted) {
      throw new HttpException(
        { message: "The user wasn't deleted" },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      status: 'success',
      message: 'User deleted.',
      data: { message: 'User was deleted successfully' },
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseData<User>> {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new HttpException(
        { message: "The user wasn't updated." },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      status: 'success',
      message: 'User updated.',
      data: updatedUser,
    };
  }

  @Put(':id/role')
  async updateUserRole(
    @Param('id') id: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<ResponseData<User>> {
    const updatedUser = await this.usersService.updateUserRole(
      id,
      updateUserRoleDto,
    );
    if (!updatedUser) {
      throw new HttpException(
        { message: "The user wasn't updated." },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      status: 'success',
      message: "User's role updated.",
      data: updatedUser,
    };
  }
}
