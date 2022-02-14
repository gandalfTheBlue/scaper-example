import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'

import { analyticErrors } from '../exceptions/exception.type'
import { AnalyticException } from '../exceptions/analytic.exception'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(exception.stack || exception)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    let statusCode, message, errorCode
    if (exception instanceof AnalyticException) {
      statusCode = exception.getStatus()
      message = exception.getResponse()
      errorCode = exception.getErrorCode()
    } else {
      statusCode = analyticErrors.internalServerError.statusCode
      message = analyticErrors.internalServerError.message
      errorCode = analyticErrors.internalServerError.errorCode
    }

    response.status(statusCode).json({
      errorCode,
      message,
    })
  }
}
