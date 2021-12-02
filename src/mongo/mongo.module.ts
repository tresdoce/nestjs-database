import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseConfig } from './types';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { connection, user, password, host, port, dbName } =
          configService.get<MongoDatabaseConfig>('config.database.mongo');
        return {
          uri: `${connection}://${user ? user : ''}${password ? `:${password}@` : ''}${host}${
            port ? `:${port}` : ''
          }/${dbName}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {
  static forFeature(features): DynamicModule {
    return MongooseModule.forFeature(features);
  }
}
