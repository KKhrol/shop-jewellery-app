import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ResponseError } from 'src/inventory/interfaces/response-error.interface';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<ResponseError> {
    const error = exception.getError().toString();
    const result = {
      status: 'error',
      message: 'Error occured in collections-microservice!',
      error: error,
    };
    console.log(result);
    //throwError(() => exception.getError());
    return of(result);
  }
}
