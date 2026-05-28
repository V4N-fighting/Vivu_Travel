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
};
export default _default;
