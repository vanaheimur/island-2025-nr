import { LivenessOutput } from "./dto/liveness.output";

import { Controller, Get, SetMetadata } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("Infra")
@SetMetadata("IS_PUBLIC_KEY", true)
export class InfraController {
  @Get("liveness")
  liveness(): LivenessOutput {
    return { ok: true };
  }
}
