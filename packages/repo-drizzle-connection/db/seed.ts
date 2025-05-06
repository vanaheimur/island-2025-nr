import 'dotenv/config'

import * as schema from './schema'

import { logger } from '@repo/logger'
import { drizzle } from 'drizzle-orm/node-postgres'
import { reset, seed } from 'drizzle-seed'

const db = drizzle(process.env.DATABASE_URL!)
async function main() {
  logger.info('Resetting the database!')
  await reset(db, schema)

  await seed(db, schema).refine((f) => ({
    person: {
      columns: {
        name: f.fullName(),
        nationalId: f.valuesFromArray({
          values: [
            '1234567890',
            '0987654321',
            '1122334455',
            ...(process.env.TEST_NATIONAL_IDS?.split(',') ?? []),
          ],
        }),
        legalResidence: f.streetAddress(),
        postCode: f.postcode(),
      },
    },
  }))

  logger.info('New data created!')
}
main()
