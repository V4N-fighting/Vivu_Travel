"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = require("fs");
const path_1 = require("path");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT || 5432),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'vivu_travel',
});
async function main() {
    const sqlPath = (0, path_1.join)(process.cwd(), 'database', 'ai_chatbot_setup.sql');
    const sql = (0, fs_1.readFileSync)(sqlPath, 'utf8');
    await pool.query(sql);
    console.log('AI chatbot database objects are ready.');
}
main()
    .catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
    .finally(async () => {
    await pool.end();
});
//# sourceMappingURL=setup-ai-db.js.map