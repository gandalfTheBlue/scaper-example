import { Injectable, Logger } from '@nestjs/common'
import puppeteer from 'puppeteer'
import delay from 'delay'
import { ScralerConfig } from '../../strategy/protocols/strategy-scrawler/strategy-scrawler.type'

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name)
  private browser: puppeteer.Browser

  public async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    })
  }

  public async getDataFromPage<T>(
    config: ScralerConfig,
    getDataFn: (page: puppeteer.Page, config: ScralerConfig) => Promise<T[]>,
    timeout = 60000 * 3
  ) {
    if (!this.browser) {
      await this.initBrowser()
    }
    await this.closeDuplicatePages(config.url)
    const page = await this.browser.newPage()
    await page.goto(config.url, { waitUntil: 'networkidle0', timeout })
    const result = await getDataFn(page, config)
    await page.close()
    return result
  }

  public async multipleClick(
    page: puppeteer.Page,
    selector: string,
    delayTime = 0
  ) {
    const elements = await page.$$(selector)
    for (let i = 0; i < elements.length; i++) {
      await elements[i].click()
      await delay(delayTime)
    }
  }

  public async clearInput(page: puppeteer.Page, selector: string) {
    await page.click(selector, { clickCount: 3 })
    await page.keyboard.press('Backspace')
  }

  public async closeDuplicatePages(url: string) {
    const pages = (await this.browser.pages()).filter(
      (page) => page.url() !== 'about:blank'
    )

    if (pages.length) {
      this.logger.log(`Current pages:`)
      pages.forEach((page) => console.log(page.url()))
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        if (page.url() === url) {
          await page.close()
        }
      }
    }
  }
}
