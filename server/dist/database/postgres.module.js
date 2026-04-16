"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresModule = void 0;
const common_1 = require("@nestjs/common");
const postgres_provider_1 = require("./postgres.provider");
const pg_1 = require("pg");
const core_1 = require("@nestjs/core");
let PostgresModule = class PostgresModule {
    constructor(moduleRef, pool) {
        this.moduleRef = moduleRef;
        this.pool = pool;
    }
    async onModuleInit() {
        try {
            const client = await this.pool.connect();
            console.log('✅ [Postgres] Connected to database successfully!');
            client.release();
        }
        catch (error) {
            console.error('❌ [Postgres] Database connection failed:', error.message);
        }
    }
    async onModuleDestroy() {
        await this.pool.end();
        console.log('Postgres connection pool closed.');
    }
};
exports.PostgresModule = PostgresModule;
exports.PostgresModule = PostgresModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [postgres_provider_1.PostgresProvider],
        exports: [postgres_provider_1.POSTGRES_POOL],
    }),
    __param(1, (0, common_1.Inject)(postgres_provider_1.POSTGRES_POOL)),
    __metadata("design:paramtypes", [core_1.ModuleRef,
        pg_1.Pool])
], PostgresModule);
//# sourceMappingURL=postgres.module.js.map