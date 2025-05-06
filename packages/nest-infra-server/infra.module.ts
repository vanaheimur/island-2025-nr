import { InfraController } from './infra.controller'

import { DynamicModule, Module, Type } from '@nestjs/common'
import { LoggerModule } from '@repo/logger'

interface InfraModuleOptions {
  appModule: Type<unknown>
}

@Module({
  controllers: [InfraController],
  imports: [LoggerModule],
})
export class InfraModule {
  static forRoot({ appModule }: InfraModuleOptions): DynamicModule {
    return {
      module: InfraModule,
      imports: [appModule],
    }
  }
}
