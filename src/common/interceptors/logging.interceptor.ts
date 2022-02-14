import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const healthCheck = '/health/check'
    const path = context.getArgByIndex(0).originalUrl

    if (path !== healthCheck) {
      console.log('Before...', path)
    }

    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        if (path !== healthCheck) {
          console.log(`After... ${Date.now() - now}ms`)
        }
      })
    )
  }
}
