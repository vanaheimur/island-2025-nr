import { AppModule } from './app.module'

import { DocumentBuilder } from '@nestjs/swagger'
import { bootstrap } from '@repo/nest-infra-server'

const port = process.env.PORT ?? '4333'

const openApiSchema = new DocumentBuilder()
  .setTitle('RSK REST endpoints')
  .setDescription(
    'Collection of endpoints to handle communications with NR systems',
  )
  .setVersion('1.0')
  .build()

void bootstrap({
  appModule: AppModule,
  port,
  openApiSchema,
})
