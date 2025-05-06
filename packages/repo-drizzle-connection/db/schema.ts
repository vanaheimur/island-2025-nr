import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const person = pgTable(
  'person',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(), // We don't use nationalId as primary key because it can be changed
    name: varchar({ length: 255 }).notNull(),
    nationalId: varchar({ length: 32 }).notNull(),
    legalResidence: varchar({ length: 100 }).notNull(),
    postCode: varchar({ length: 10 }).notNull(),
    familyNumber: varchar({ length: 100 }).notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('nationalId').on(table.name)],
)
