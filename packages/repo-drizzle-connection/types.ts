import * as schema from './db/schema'

import { drizzle } from 'drizzle-orm/node-postgres'

export type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>
