import { CouponsRepository } from './coupons.repository';
export declare class CouponsService {
    private readonly couponsRepository;
    constructor(couponsRepository: CouponsRepository);
    findByCode(code: string): Promise<any>;
    findAll(): Promise<any[]>;
}
