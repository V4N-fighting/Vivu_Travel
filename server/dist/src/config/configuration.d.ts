declare const _default: () => {
    port: number;
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        name: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        origin: string;
    };
    mail: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
    ai: {
        provider: string;
        geminiApiKey: string;
        geminiModel: string;
        maxContextDocuments: number;
        requestLimitPerMinute: number;
    };
};
export default _default;
