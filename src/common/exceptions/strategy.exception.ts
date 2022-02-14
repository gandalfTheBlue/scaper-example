import { HttpStatus } from '@nestjs/common'

import { AnalyticException } from './analytic.exception'

export class StrategyException extends AnalyticException {
  constructor(protocol: string, stack: string, path?: string) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 1505,
      message: `There was an issue collecting strategy data for ${protocol}`,
      stack,
      path,
    })
  }
}
