import { BannersRepository } from './banners.repository';
export declare class BannersService {
    private readonly bannersRepo;
    constructor(bannersRepo: BannersRepository);
    findAll(): Promise<any[]>;
    findActive(): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
