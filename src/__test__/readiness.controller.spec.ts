import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { ReadinessController } from '../health/controllers/readiness.controller';
import { CONFIG_OPTIONS } from '../health/constants';

const config = {
    services: {
        rickAndMortyAPI: 'https://rickandmortyapi.com/api/character/1',
    },
};

describe('ReadinessController', () => {
    let controller: ReadinessController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TerminusModule, HttpModule],
            controllers: [ReadinessController],
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: config,
                },
            ],
        }).compile();

        controller = module.get<ReadinessController>(ReadinessController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be return up services', async () => {
        expect(await controller.check()).toEqual({ rickAndMortyAPI: { status: 'up' } });
    });
});
