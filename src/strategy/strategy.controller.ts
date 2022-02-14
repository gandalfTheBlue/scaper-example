import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { StrategyService } from './strategy.service'

@ApiTags('Strategy API')
@Controller()
export class StrategyController {
  constructor(private strategyService: StrategyService) {}

  @Get('/strategies')
  @ApiResponse({ status: HttpStatus.OK })
  public async searchTokens() {
    return this.strategyService.loadStrategies()
  }
}
