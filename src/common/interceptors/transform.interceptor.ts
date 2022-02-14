import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T> {
  intercept(_: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(map((data) => data))
  }
}
