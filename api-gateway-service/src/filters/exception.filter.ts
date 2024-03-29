import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let error: string | object;
    if (
      typeof exceptionResponse == 'object' &&
      exceptionResponse.hasOwnProperty('message')
    ) {
      error = exception.message;
    } else {
      error = exceptionResponse;
    }
    response.status(status).json({
      status: 'error',
      message: 'Error occured in api-gateway!',
      error: error,
    });
  }
}
