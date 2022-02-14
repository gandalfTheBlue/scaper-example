import { analyticErrors } from './exception.type'
import { AnalyticException } from './analytic.exception'

export class UnauthorizedException extends AnalyticException {
  constructor() {
    super(analyticErrors.unauthorized)
  }
}
