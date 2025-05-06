import { Module } from '@nestjs/common'
import { PersonsModule } from './persons/persons.module'

@Module({
  imports: [PersonsModule],
})
export class AppModule {}
