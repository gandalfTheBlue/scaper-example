import { Injectable } from '@nestjs/common'

import { TokemakDataService } from './protocols/tokemak/tokemak-data.service'

@Injectable()
export class StrategyService {
  constructor(private tokemakDataService: TokemakDataService) {}

  public async loadStrategies() {
    return this.tokemakDataService.getStrategyData()
  }
}
