import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export const POSTGRES_POOL = 'POSTGRES_POOL';

export const PostgresProvider: Provider = {
  provide: POSTGRES_POOL,
  useFactory: (configService: ConfigService) => {
    const dbConfig = configService.get('database');
    return new Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.name,
      max: 20, // Số lượng kết nối tối đa trong pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  },
  inject: [ConfigService],
};
