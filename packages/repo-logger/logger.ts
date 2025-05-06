import { utilities } from 'nest-winston'
import { createLogger, format, transport, transports } from 'winston'

// Default log settings for debug mode
let logLevel = 'debug'
let logFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp(),
  utilities.format.nestLike('App'),
)

// Production overrides
if (process.env.NODE_ENV === 'production') {
  logLevel = process.env.LOG_LEVEL || 'info'
  logFormat = format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
  )
}

const datadogApiKey = process.env.DATADOG_API_KEY
const serviceName = process.env.WEB_APP_NAME

const logTransports: transport[] = [new transports.Console()]

if (datadogApiKey && serviceName) {
  const httpTransportOptions = {
    host: 'http-intake.logs.datadoghq.eu',
    path: `/api/v2/logs?dd-api-key=${datadogApiKey}&ddsource=nodejs&service=${serviceName}`,
    ssl: true,
  }

  logTransports.push(new transports.Http(httpTransportOptions))
}

export const logger = createLogger({
  level: logLevel,
  format: logFormat,
  transports: logTransports,
  handleExceptions: true,
  exitOnError: true,
  exceptionHandlers: logTransports,
  rejectionHandlers: logTransports,
})
