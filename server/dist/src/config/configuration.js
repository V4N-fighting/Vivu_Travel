"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'your_password',
        name: process.env.DATABASE_NAME || 'vivu_travel',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    },
    mail: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.MAIL_PORT, 10) || 587,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM || '"Vivu Travel" <no-reply@vivutravel.com>',
    },
    ai: {
        provider: 'gemini',
        geminiApiKey: process.env.GEMINI_API_KEY,
        geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
        maxContextDocuments: parseInt(process.env.AI_MAX_CONTEXT_DOCUMENTS, 10) || 8,
        requestLimitPerMinute: parseInt(process.env.AI_RATE_LIMIT_PER_MINUTE, 10) || 20,
    },
});
//# sourceMappingURL=configuration.js.map