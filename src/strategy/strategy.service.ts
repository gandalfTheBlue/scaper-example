import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { StrategyScrawlerService } from './protocols/strategy-scrawler/strategy-scrawler.service'
import scrawlerConfig from './protocols/scrawler.json'

@Injectable()
export class StrategyService {
  constructor(private strategyScrawlerService: StrategyScrawlerService) {
    this.loadStrategies()
  }

  @Cron(CronExpression.EVERY_HOUR)
  public async loadStrategies() {
    Object.keys(scrawlerConfig).forEach(async (protocol) => {
      const result = await this.strategyScrawlerService.getStrategyData(
        scrawlerConfig[protocol]
      )
      console.log(result)
    })
  }
}
