import { Global, Module, OnModuleDestroy, OnModuleInit, Inject } from '@nestjs/common';
import { PostgresProvider, POSTGRES_POOL } from './postgres.provider';
import { Pool } from 'pg';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  providers: [PostgresProvider],
  exports: [POSTGRES_POOL],
})
export class PostgresModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(POSTGRES_POOL) private readonly pool: Pool,
  ) {}

  async onModuleInit() {
    try {
      const client = await this.pool.connect();
      console.log('✅ [Postgres] Connected to database successfully!');
      client.release();
    } catch (error) {
      console.error('❌ [Postgres] Database connection failed:', error.message);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('Postgres connection pool closed.');
  }
}
