import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ResponseError } from '../interfaces/response-error.interface';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(
    exception: RpcException,
    host: ArgumentsHost,
  ): Observable<ResponseError> {
    const error = exception.getError().toString();
    const result = {
      status: 'error',
      message: 'Error occured in collections-microservice!',
      error: error,
    };
    //throwError(() => exception.getError());
    return of(result);
  }
}
