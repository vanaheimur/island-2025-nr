import { PersonOutput } from './dto/person.output'
import { PersonsService } from './persons.service'

import { Controller, Get, Param } from '@nestjs/common'

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}
  @Get(':nationalId')
  async getPersonByNationalId(
    @Param('nationalId') nationalId: string,
  ): Promise<PersonOutput> {
    const {
      createdAt: _a,
      updatedAt: _b,
      ...person
    } = await this.personsService.getPersonByNationalId(nationalId)
    return new PersonOutput(person)
  }
}
