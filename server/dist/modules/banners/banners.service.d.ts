import { BannersRepository } from './banners.repository';
export declare class BannersService {
    private readonly bannersRepository;
    constructor(bannersRepository: BannersRepository);
    findAll(): Promise<any[]>;
}
