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
    google: {
        clientId: string;
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
        groqApiKey: string;
        groqModel: string;
        groqApiUrl: string;
        maxContextDocuments: number;
        requestLimitPerMinute: number;
    };
};
export default _default;
