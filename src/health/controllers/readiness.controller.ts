import {Controller, Get, Inject} from '@nestjs/common';
import {HealthCheck, HealthCheckService, HttpHealthIndicator} from '@nestjs/terminus';
import {CONFIG_OPTIONS} from '../constants';

@Controller()
export class ReadinessController {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly appConfig: any,
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ) {
    }

    @Get('readiness')
    @HealthCheck()
    async check() {
        const servicesPingCheckList = Object.keys(this.appConfig.services).map((key) => {
            const urlService = new URL(this.appConfig.services[key]);
            return () => this.http.pingCheck(`${key}`, `${urlService.origin}`);
        });

        const response = this.health.check([...servicesPingCheckList]);
        return (await response).info;
    }
}
