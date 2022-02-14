import { HttpException } from '@nestjs/common'

import { AnalyticError } from './exception.type'

export class AnalyticException extends HttpException {
  private errorCode: number
  private path: string

  constructor(analyticError: AnalyticError) {
    super(analyticError.message, analyticError.statusCode)
    this.errorCode = analyticError.errorCode
    if (analyticError.stack) {
      this.stack = analyticError.stack
    }
    if (analyticError.path) {
      this.path = analyticError.path
    }
  }

  public getErrorCode() {
    return this.errorCode
  }

  public getPath() {
    return this.path
  }
}
