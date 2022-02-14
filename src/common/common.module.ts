import { CacheModule, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { HealthController } from './health.controller'
import { HttpCacheInterceptor } from './interceptors/http-cache.interceptor'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { CrawlerService } from './services/crawler.service'

@Module({
  imports: [CacheModule.register()],
  controllers: [HealthController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: HttpCacheInterceptor },

    CrawlerService,
  ],
  exports: [CrawlerService],
})
export class CommonModule {}
