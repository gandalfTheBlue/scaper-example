import { HttpStatus } from '@nestjs/common'

export class AnalyticError {
  statusCode: HttpStatus
  errorCode: number
  message: string
  stack?: string
  path?: string
}

export const analyticErrors = {
  unauthorized: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 1102,
    message: 'The api key is invalid.',
  },
  signatureTimeout: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 1103,
    message: 'The signatue is timeout.',
  },
  internalServerError: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 1500,
    message: 'Internal Server Error',
  },
  requestParamsInvalid: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 1000,
    message: 'The request parameters are not correct.',
  },
}
