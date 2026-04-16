"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresProvider = exports.POSTGRES_POOL = void 0;
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
exports.POSTGRES_POOL = 'POSTGRES_POOL';
exports.PostgresProvider = {
    provide: exports.POSTGRES_POOL,
    useFactory: (configService) => {
        const dbConfig = configService.get('database');
        return new pg_1.Pool({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.name,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=postgres.provider.js.map