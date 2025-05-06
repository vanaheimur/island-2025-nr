import { InfraModule } from './infra.module'

import {
  ClassSerializerInterceptor,
  INestApplication,
  Type,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { logger, LoggerModule } from '@repo/logger'
import cookieParser from 'cookie-parser'
import * as fs from 'fs'
import type { Server } from 'http'
import yaml from 'js-yaml'

// Allow client connections to stay connected for up to 30 seconds of inactivity. For reference, the default value in
// Node.JS is 5 seconds, Kestrel (.NET) is 120 seconds and Nginx is 75 seconds.
const KEEP_ALIVE_TIMEOUT = 1000 * 30

interface BootstrapOptions<T extends boolean | undefined = undefined> {
  /**
   * Main nest module.
   */
  appModule: Type<unknown>

  /**
   * The open api schema definition
   */
  openApiSchema?: Omit<OpenAPIObject, 'paths'>

  /**
   * Should infra generate a openApi file
   */
  generateOpenApiFile?: true

  /**
   * The port to start the server on.
   */
  port: T extends true ? undefined : string | number

  /**
   * Returns the application instance without starting the server if skip is true.
   */
  skipInitializingRequestHandler?: T

  /**
   * A hook that is called after the application is created and before the server is started.
   * To allow external systems to extend the base application.
   */
  extendApp?: (app: INestApplication) => Promise<void> | void

  /**
   * Set a global prefix for all routes.
   * defaults to "api"
   */
  prefix?: string
}
type BootstrapReturn<T extends boolean | undefined> = T extends true
  ? INestApplication
  : undefined

export const createApp = async <T extends boolean | undefined>(
  options: BootstrapOptions<T>,
) => {
  const app = await NestFactory.create(
    InfraModule.forRoot({
      appModule: options.appModule,
    }),
    {
      logger: LoggerModule.createLogger(),
    },
  )

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
  app.setGlobalPrefix(options.prefix ?? 'api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.use(cookieParser())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.enableCors({
    /**
     * This will cause the server to respond with the request domain in the allowed origins header,
     * in production true origin header is managed by Azure
     */
    origin: true,
    credentials: true,
  })

  /**
   * We allow the consuming application to hook into the application creation
   * to allow features like shutdown hooks to be added.
   */
  await options.extendApp?.(app)

  return app
}

const startServer = async (app: INestApplication, port: string | number) => {
  const server = (await app.listen(port, () => {
    logger.info(`Service listening at http://localhost:${port}`, {
      context: 'Bootstrap',
    })
  })) as Server

  // Allow connections to remain idle for a bit longer than the default 5s.
  server.keepAliveTimeout = KEEP_ALIVE_TIMEOUT
  return app
}

function setupOpenApi(
  app: INestApplication,
  openApi: Omit<OpenAPIObject, 'paths'>,
  prefix = 'api',
) {
  const document = SwaggerModule.createDocument(app, openApi)
  SwaggerModule.setup(`/${prefix}`, app, document)

  return document
}

function generateSchema(filePath: string, document: OpenAPIObject) {
  logger.info('Generating OpenAPI schema.', { context: 'Bootstrap' })
  fs.writeFileSync(filePath, yaml.dump(document, { noRefs: true }))
}

const shouldStartServer = (
  options: BootstrapOptions<boolean | undefined>,
): options is BootstrapOptions<undefined> =>
  !options.skipInitializingRequestHandler

export const bootstrap = async <T extends boolean | undefined>(
  options: BootstrapOptions<T>,
) => {
  const app = await createApp(options)

  if (options.openApiSchema && !options.skipInitializingRequestHandler) {
    const document = setupOpenApi(app, options.openApiSchema, options.prefix)

    if (options.generateOpenApiFile) {
      generateSchema('./open-api.yaml', document)
      await app.close()
      return undefined as BootstrapReturn<T>
    }
  }

  if (shouldStartServer(options)) {
    return (await startServer(app, options.port)) as BootstrapReturn<T>
  } else {
    await app.init()
    await app.close()
  }
}
