Klára readme.md

Setja variables inn í Github Actions til að keyra Playwright

# Drizzle Connection Module

This package provides a connection module for integrating with a PostgreSQL database using Drizzle ORM in a NestJS application. It includes schema definitions, seed data utilities, and configuration for database migrations.

## Features

- **Database Connection**: Establishes a connection to a PostgreSQL database using Drizzle ORM.
- **Schema Definitions**: Contains pre-defined database schemas for tables like `user`, `tax_return`, `mortgage`, and more.
- **Seeding Utilities**: Includes utilities and scripts to seed the database with test data.
- **Migration Support**: Configured for database migrations using `drizzle-kit`.

## Installation

Install the package via your workspace:

```bash
yarn add @repo/drizzle-connection
```

## Usage

### Importing the Module

To use the Drizzle Connection Module in your NestJS application, import it into your module:

```ts
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
})
export class AppModule {}
```

### Accessing the Drizzle Client

The Drizzle client is provided as a dependency and can be injected into your services:

```ts
import { Inject } from '@nestjs/common'
import { DRIZZLE_CLIENT, DrizzleClient } from '@repo/drizzle-connection'

@Injectable()
export class ExampleService {
  constructor(
    @Inject(DRIZZLE_CLIENT)
    private readonly drizzleClient: DrizzleClient,
  ) {}

  async getData() {
    return this.drizzleClient.query(/* your query here */)
  }
}
```

### Seeding the Database

To seed the database with test data, run the `seed.ts` script:

```bash
node db/seed.ts
```

### Running Migrations

To generate and run migrations, use `drizzle-kit`:

```bash
# Generate a migration
npx drizzle-kit generate "migration_name"

# Apply migrations
npx drizzle-kit migrate
```

## Configuration

The module uses environment variables for configuration. Ensure the following variable is set in your `.env` file:

```env
DATABASE_URL=your_database_connection_string
```

## Development

### Folder Structure

- **`db/schema.ts`**: Defines the database schema.
- **`db/seed.ts`**: Script for seeding the database.
- **`db/migrations/`**: Contains migration files.
- **`config.ts`**: Configuration for the module.
- **`drizzle-connection.module.ts`**: The main module for database connection.

### Scripts

- **Build**: `yarn build`
- **Dev**: `yarn dev`
- **Lint**: `yarn lint`

## License

This package is licensed under the UNLICENSED license.
