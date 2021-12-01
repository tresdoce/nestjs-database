import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      mongo: {
        connectionName: 'tresdoce-local',
        connection: 'mongodb',
        user: encodeURIComponent('mdelgado'),
        password: encodeURIComponent('34716927'),
        host: '127.0.0.1',
        port: parseInt('27017', 10),
        dbName: 'tresdoce',
      },
    },
  };
});
