import { Body, Controller, Put } from '@nestjs/common';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}
  @Put('forgot')
  async sendCode(
    @Body('email') email: string,
  ): Promise<Record<string, string>> {
    return this.passwordService.sendCode(email);
  }

  @Put('reset')
  async updatePassword(
    @Body() body: ResetPasswordUserDto,
  ): Promise<Record<string, string>> {
    return this.passwordService.updatePassword(body);
  }
}
