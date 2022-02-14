import { Module } from '@nestjs/common'

import { CommonModule } from '../common/common.module'
import { TokemakDataService } from './protocols/tokemak/tokemak-data.service'
import { StrategyController } from './strategy.controller'
import { StrategyService } from './strategy.service'

@Module({
  imports: [CommonModule],
  providers: [StrategyService, TokemakDataService],
  exports: [StrategyService, TokemakDataService],
  controllers: [StrategyController],
})
export class StrategyModule {}
