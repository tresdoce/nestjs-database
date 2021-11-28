import { Controller, Get } from '@nestjs/common';

@Controller()
export class LivenessController {
    @Get('liveness')
    getLiveness() {
        return { status: 'up' };
    }
}
