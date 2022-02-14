import { analyticErrors } from './exception.type'
import { AnalyticException } from './analytic.exception'

export class ParametersInvaildException extends AnalyticException {
  constructor() {
    super(analyticErrors.requestParamsInvalid)
  }
}
