import Joi from 'joi'
import { DeepRequired } from 'utility-types'

const config = () => {
  const values = {
    secret: process.env.AUTH_TOKEN_SECRET,
  }

  const schema = Joi.object({
    secret: Joi.string().required(),
  })

  const { error } = schema.validate(values, { allowUnknown: false })

  if (error) {
    throw new Error(`Config validation error in auth module: ${error.message}`)
  }

  return {
    auth: values,
  }
}

export type AuthConfig = DeepRequired<ReturnType<typeof config>>

export default config
