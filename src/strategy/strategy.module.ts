import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CommonModule } from '../common/common.module'
import { StrategyScrawlerService } from './protocols/strategy-scrawler/strategy-scrawler.service'
import { StrategyService } from './strategy.service'

@Module({
  imports: [ScheduleModule.forRoot(), CommonModule],
  providers: [StrategyService, StrategyScrawlerService],
  exports: [StrategyService, StrategyScrawlerService],
})
export class StrategyModule {}
