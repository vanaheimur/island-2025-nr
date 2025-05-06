import { PersonsController } from './persons.controller'
import { PersonsService } from './persons.service'

import { Module } from '@nestjs/common'
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
