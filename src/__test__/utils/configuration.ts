import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      mongo: {
        connection: process.env.MONGO_CONNECTION || 'mongodb',
        user: encodeURIComponent(process.env.MONGO_USER),
        password: encodeURIComponent(process.env.MONGO_PASSWORD),
        host: process.env.MONGO_HOST,
        port: parseInt(process.env.MONGO_PORT, 10),
        dbName: process.env.MONGO_DB_NAME,
      },
    },
  };
});
