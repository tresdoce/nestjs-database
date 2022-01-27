import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { MongoModule } from '../mongo/mongo.module';
import { User } from './utils/user.entity';

import { config } from './utils';
import { ConfigModule } from '@nestjs/config';

describe('DatabaseModule', () => {
  let app: INestApplication;
  const mockMongoToken = {
    provide: getModelToken(User.name),
    useValue: {
      find: jest.fn(() => [
        {
          firstname: 'juan',
          lastname: 'perez',
        },
      ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        MongoModule,
      ],
      providers: [mockMongoToken],
    }).compile();
    //spyOn(console, 'log');
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be define', async () => {
    expect(app).toBeDefined();
  }, 50000);
});
