import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationViaClassPipe } from './pipes/validation-via-class.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationViaClassPipe());
  /*app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );*/
  //app.use(passport.initialize());
  //app.use(passport.session());
  await app.listen(8001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
