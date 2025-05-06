import { AuthModule } from './auth/auth.module'
import { PersonsModule } from './persons/persons.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [AuthModule, PersonsModule],
})
export class AppModule {}
