import { logger } from './logger'

export type { Logger } from 'winston'
import { Global, LoggerService, Module } from '@nestjs/common'
import { WinstonLogger } from 'nest-winston'

export const LOGGER_PROVIDER = 'Logger'

@Global()
@Module({
  providers: [{ provide: LOGGER_PROVIDER, useValue: logger }],
  exports: [{ provide: LOGGER_PROVIDER, useValue: logger }],
})
export class LoggerModule {
  static createLogger(): LoggerService {
    return new WinstonLogger(logger)
  }
}
