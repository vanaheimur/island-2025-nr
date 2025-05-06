import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  DRIZZLE_CLIENT,
  type DrizzleClient,
  eq,
} from '@repo/drizzle-connection'

@Injectable()
export class PersonsService {
  constructor(@Inject(DRIZZLE_CLIENT) private readonly db: DrizzleClient) {}

  public async getPersonByNationalId(nationalId: string) {
    const data = await this.db.query.person.findFirst({
      where(fields) {
        return eq(fields.nationalId, nationalId)
      },
    })

    if (!data) {
      throw new NotFoundException('Person not found')
    }

    return data
  }
}
