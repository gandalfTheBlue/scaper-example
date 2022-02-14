import { Injectable } from '@nestjs/common'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'

import { CrawlerService } from '../../../common/services/crawler.service'
import {
  getNumberFromAbbr,
  getNumberFromPercentage,
} from '../../../common/utils/number'
import { SrawlerData } from './tokemak-data.model'

@Injectable()
export class TokemakDataService {
  constructor(private crawlerService: CrawlerService) {}

  public async getStrategyData() {
    const result = await this.crawlerService.getDataFromPage<SrawlerData>(
      'https://www.tokemak.xyz/',
      this.getTokemakData.bind(this)
    )
    return result.filter((item) => !!item.pool)
  }

  private async getTokemakData(page: puppeteer.Page): Promise<SrawlerData[]> {
    const result: SrawlerData[] = []
    // click 'Enter the Tokemak'
    await page.click('button.enterreactor')

    const html = await page.content()
    const $ = cheerio.load(html)

    $('.mb-20').each((_, ele) => {
      $(ele)
        .children()
        .filter('.mb-6')
        .each((_, ele) => {
          const container = $(ele).find('div > div')
          const poolName = $(container)
            .find('div > div:nth-child(1) > div > div > div:nth-child(1)')
            .text()

          const depositApyPercentage = $(container)
            .find(
              'div > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)'
            )
            .text()
          const depositApy = getNumberFromPercentage(depositApyPercentage)

          const tvlAbbr = $(container)
            .find(
              'div > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)'
            )
            .text()
          const tvl = getNumberFromAbbr(tvlAbbr)

          const voteApyPercentage = $(container)
            .find(
              'div > div:nth-child(3) > div:nth-child(3) > div:nth-child(1)'
            )
            .text()
          const voteApy = getNumberFromPercentage(voteApyPercentage)

          result.push({
            pool: poolName,
            apy: depositApy + voteApy,
            tvl: tvl,
          })
        })
    })
    return result
  }
}
