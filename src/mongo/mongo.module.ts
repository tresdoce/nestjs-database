import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

interface MongoDatabaseConfig {
  connectionName: string;
  connection: string;
  user: string;
  password: string;
  host: string;
  port: number;
  dbName: string;
}

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { connectionName, connection, user, password, host, port, dbName } =
          configService.get<MongoDatabaseConfig>('config.database.mongo');
        return {
          connectionName,
          useNewUrlParser: true,
          useUnifiedTopology: true,
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
