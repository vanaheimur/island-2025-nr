import Joi from 'joi'
import { DeepRequired } from 'utility-types'

const config = () => {
  const values = {
    databaseUrl: process.env.DATABASE_URL,
  }

  const schema = Joi.object({
    databaseUrl: Joi.string().uri().required(),
  })

  const { error } = schema.validate(values, { allowUnknown: false })

  if (error) {
    throw new Error(
      `Config validation error in drizzle connection module: ${error.message}`,
    )
  }

  return {
    drizzleConnection: values,
  }
}

export type DrizzleConnectionConfig = DeepRequired<ReturnType<typeof config>>

export default config
