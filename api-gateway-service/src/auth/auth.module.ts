import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as Dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
Dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'SECRET_WORD' || process.env.JWT_SECRET_WORD,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
