/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'

import { LoggingInterceptor } from './logging.interceptor'

describe('LoggingInterceptor', () => {
  let loggingInterceptor: LoggingInterceptor
  let moduleRef: TestingModule

  beforeEach(async () => {
    class ReflectorMock {
      get() {}
    }

    moduleRef = await Test.createTestingModule({
      providers: [
        LoggingInterceptor,
        { provide: 'Reflector', useClass: ReflectorMock },
      ],
    }).compile()
    moduleRef.useLogger(false)
    loggingInterceptor = moduleRef.get(LoggingInterceptor)
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  describe('intercept', () => {
    it('should return empty object if request path is not /check', async () => {
      jest.spyOn(moduleRef.get(Reflector), 'get').mockReturnValue('/wallet')

      const context = {
        getArgByIndex: function () {
          return 'path'
        },
      }

      const next = {
        handle: function () {
          return {
            pipe: function () {
              return {}
            },
          }
        },
      }

      const result = loggingInterceptor.intercept(context as any, next as any)
      expect(result).toEqual({})
    })

    it('should return empty object if request path is /check', async () => {
      jest.spyOn(moduleRef.get(Reflector), 'get').mockReturnValue('/check')

      const context = {
        getArgByIndex: function () {
          return 'path'
        },
      }

      const next = {
        handle: function () {
          return {
            pipe: function () {
              return {}
            },
          }
        },
      }

      const result = loggingInterceptor.intercept(context as any, next as any)
      expect(result).toEqual({})
    })
  })
})
