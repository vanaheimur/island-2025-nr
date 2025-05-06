# Nest infra server

This library manages the initialization af a NestJS server to ensure consistency in setup between applications.

On init the server will:

- Setup all default pipes with sensible defaults
- Initialize our logger correctly
- Create health check endpoints
- Ensure consistency in endpoint versioning and prefixes
- Initialize swagger if requested
- Handle generation of Open api schema file if requested
- Display on what port the server is running

### How to use:

Basic server:

```ts
import { bootstrap } from "@olis/nest-infra-server";
import { AppModule } from "@modules/app.module";

bootstrap({
  appModule: AppModule,
  port: 5000,
});
```

Server with swagger:

```ts
import { bootstrap } from "@mew-products/nest-infra-server";
import { AppModule } from "@modules/app.module";
import { DocumentBuilder } from "@nestjs/swagger";

const openApiSchema = new DocumentBuilder()
  .setTitle("Recipe API")
  .setDescription("Service to store recipes made from products")
  .setVersion("1.0")
  .build();

bootstrap({
  appModule: AppModule,
  generateOpenApiFile: !!process.env.GENERATE_OPEN_API_DOCUMENT || undefined,
  port: 5002,
  openApiSchema,
});
```
