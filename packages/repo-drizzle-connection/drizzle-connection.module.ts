import config, { DrizzleConnectionConfig } from './config'
import { DRIZZLE_CLIENT } from './constants'
import * as schema from './db/schema'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from '@repo/logger'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

@Module({
  imports: [ConfigModule.forFeature(config), LoggerModule],
  providers: [
    {
      provide: DRIZZLE_CLIENT,
      useFactory: async (
        configService: ConfigService<DrizzleConnectionConfig>,
      ) => {
        const connectionString = configService.getOrThrow(
          'drizzleConnection.databaseUrl',
          { infer: true },
        )
        const pool = new Pool({
          connectionString,
        })

        return drizzle({ client: pool, schema })
      },
      inject: [ConfigService],
    },
  ],
  exports: [DRIZZLE_CLIENT],
})
export class DrizzleConnectionModule {}
