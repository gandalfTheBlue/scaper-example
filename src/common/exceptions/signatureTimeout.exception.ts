import { analyticErrors } from './exception.type'
import { AnalyticException } from './analytic.exception'

export class SignatureTimeoutException extends AnalyticException {
  constructor() {
    super(analyticErrors.signatureTimeout)
  }
}
