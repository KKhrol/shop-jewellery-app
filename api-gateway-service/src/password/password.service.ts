import { MailerService } from '@nestjs-modules/mailer';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
//import * as Dotenv from 'dotenv';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
//Dotenv.config();
import { env } from 'process';

@Injectable()
export class PasswordService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}
  async sendCode(email: string): Promise<Record<string, string>> {
    const resetUser = await this.usersService.findUser({
      email: email,
    });
    if (!resetUser || !resetUser.userId) {
      throw new NotFoundException({ message: "Invalid 'egirl'" });
    }

    const resetCode = this.jwtService.sign(
      {
        uid: resetUser.userId,
      },
      { expiresIn: '1h' },
    );
    const updatedUser = await this.usersService.updateUser(resetUser.userId, {
      resetCode,
    });
    if (!updatedUser) {
      throw new HttpException(
        'ResetCode was not applied to user',
        HttpStatus.NOT_MODIFIED,
      );
    }
    await this.mailerService.sendMail({
      to: resetUser.email,
      from: env.USER_EMAIL,
      subject: 'Getting resetCode',
      template: '../emailTemplate',
      context: { resetCode: resetCode },
    });
    return { message: 'The resetCode was sent to ' + resetUser.email };
  }

  async updatePassword(
    body: ResetPasswordUserDto,
  ): Promise<Record<string, string>> {
    const resetUser = await this.usersService.findUser({
      email: body.email,
    });
    if (!resetUser.userId) {
      throw new NotFoundException({ message: 'Invalid email' });
    }
    if (resetUser.resetCode !== body.resetCode) {
      throw new HttpException('Wrong reset code!', HttpStatus.FORBIDDEN);
    } else {
      const hashPassword = await bcrypt.hash(body.password, 5);
      await this.usersService.updateUser(resetUser.userId, {
        password: hashPassword,
      });
      return { message: 'The new password was set' };
    }
  }
}
