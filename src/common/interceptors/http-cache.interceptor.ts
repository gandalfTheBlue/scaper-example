import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected allowedMethods = ['GET']

  trackBy(context: ExecutionContext): string | undefined {
    const httpAdapter = this.httpAdapterHost.httpAdapter

    const request = context.getArgByIndex(0)
    if (!this.isRequestCacheable(context)) {
      return undefined
    }
    return httpAdapter.getRequestUrl(request)
  }

  protected isRequestCacheable(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest()
    return this.allowedMethods.includes(req.method)
  }
}
