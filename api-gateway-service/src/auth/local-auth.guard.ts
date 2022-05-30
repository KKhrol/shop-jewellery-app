import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = (await super.canActivate(context)) as boolean;

      const request = context.switchToHttp().getRequest();

      await super.logIn(request);
      return result;
    } catch (err) {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
