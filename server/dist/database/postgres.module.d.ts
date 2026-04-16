import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { ModuleRef } from '@nestjs/core';
export declare class PostgresModule implements OnModuleInit, OnModuleDestroy {
    private readonly moduleRef;
    private readonly pool;
    constructor(moduleRef: ModuleRef, pool: Pool);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
