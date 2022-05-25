import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PasswordController } from './password/password.controller';
import { PasswordService } from './password/password.service';

@Module({
  controllers: [UsersController, PasswordController],
  providers: [UsersService, PrismaService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
