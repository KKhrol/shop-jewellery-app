import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/exception.filter';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/interfaces/user.interface';
import { AuthService } from './auth.service';

@UseFilters(new HttpExceptionFilter())
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseData<User>> {
    const createdUser = await this.authService.createUser(createUserDto);
    if (!createdUser) {
      throw new HttpException(
        { message: "The user wasn't created." },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      status: 'success',
      message: 'User created.',
      data: createdUser,
    };
  }
}
