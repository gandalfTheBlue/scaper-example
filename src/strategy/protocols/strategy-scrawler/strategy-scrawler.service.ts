import { Injectable } from '@nestjs/common'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'

import { CrawlerService } from '../../../common/services/crawler.service'
import {
  getNumberFromAbbr,
  getNumberFromPercentage,
} from '../../../common/utils/number'
import { ScralerConfig, ScrawlerData } from './strategy-scrawler.type'

@Injectable()
export class StrategyScrawlerService {
  constructor(private crawlerService: CrawlerService) {}

  public async getStrategyData(config: ScralerConfig) {
    const result = await this.crawlerService.getDataFromPage<ScrawlerData>(
      config,
      this.getTokemakData.bind(this)
    )
    return result.filter((item) => !!item.pool)
  }

  private async getTokemakData(
    page: puppeteer.Page,
    config: ScralerConfig
  ): Promise<ScrawlerData[]> {
    const result: ScrawlerData[] = []

    const { preActions, action } = config
    if (config.preActions) {
      for (let i = 0; i < preActions.length; i++) {
        const preAction = preActions[i]
        if (preAction.type === 'click') {
          await page.click(preAction.element)
        }
      }
    }

    const html = await page.content()
    const $ = cheerio.load(html)

    const { root, filter, container, pool, apy, tvl } = action
    $(root).each((_, ele) => {
      let children = $(ele).children()
      if (filter) {
        children = children.filter(filter)
      }

      children.each((_, ele) => {
        const containerEle = $(ele).find(container)
        const poolName = $(containerEle).find(pool).text()
        let apyNumber
        if (typeof apy === 'string') {
          apyNumber = getNumberFromPercentage($(containerEle).find(apy).text())
        } else {
          apyNumber = apy
            .map((item) =>
              getNumberFromPercentage($(containerEle).find(item.element).text())
            )
            .reduce((a, b) => a + b, 0)
        }
        const tvlNumber = getNumberFromAbbr($(containerEle).find(tvl).text())

        result.push({
          pool: poolName,
          apy: apyNumber,
          tvl: tvlNumber,
        })
      })
    })
    return result
  }
}
