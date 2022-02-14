import { Controller, Get } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

/**
 * This endpoint is called by rancher every 30 seconds to check tokenpad's backend service's status.
 * If the response http code is 200, it means our service is ok.
 */
@Controller('/health')
export class HealthController {
  @ApiExcludeEndpoint()
  @Get('/check')
  check(): string {
    return 'Ok'
  }
}
