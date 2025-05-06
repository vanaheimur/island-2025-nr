# Nest infra server

This library ensures our logs are consistent across all our applications.

## How to use:

Using injection:

```ts
import { Logger, LOGGER_PROVIDER } from '@modules/logging/logging.module'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
  constructor(
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {}

  getProduct(id: string) {
    this.logger.info(`Getting product with id: ${id}`)
  }
}
```

Directly (Not recommended inside injectable Nest sections):

```ts
import { logger } from '@repo/logger'

logger.info(`Service listening at http://localhost:${port}`, {
  context: 'Bootstrap',
})
```
