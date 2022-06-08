import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { env } from 'process';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: env.DB_HOST,
        secure: false,
        service: 'gmail',
        auth: {
          user: env.USER_EMAIL,
          pass: env.USER_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      template: {
        dir: 'src/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UsersModule,
    JwtModule.register({
      secret: env.JWT_SECRET_WORD || 'SECRET',
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService],
  exports: [PasswordService],
})
export class PasswordModule {}
