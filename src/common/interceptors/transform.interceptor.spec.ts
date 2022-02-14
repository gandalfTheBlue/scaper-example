/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing'

import { LoggingInterceptor } from './logging.interceptor'
import { TransformInterceptor } from './transform.interceptor'

describe('TransformInterceptor', () => {
  let transfromInterceptor: TransformInterceptor<string>
  let moduleRef: TestingModule

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [LoggingInterceptor],
    }).compile()

    moduleRef.useLogger(false)
    transfromInterceptor = moduleRef.get(LoggingInterceptor)
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  describe('intercept', () => {
    it('should return wrapped object with data property', async () => {
      const context = {
        getArgByIndex: function () {
          return 'path'
        },
      }

      const next = {
        handle: function () {
          return {
            pipe: function () {
              return { data: 'test' }
            },
          }
        },
      }

      const result = transfromInterceptor.intercept(context as any, next as any)
      expect(result).toEqual({ data: 'test' })
    })
  })
})
