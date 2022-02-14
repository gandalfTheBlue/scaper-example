import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'

import { CommonModule } from './common/common.module'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'
import { StrategyModule } from './strategy/strategy.module'

const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'],
  }),
  CommonModule,
  StrategyModule,
]

@Module({
  imports,
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
