import { CountriesRepository } from './countries.repository';
export declare class CountriesService {
    private readonly countriesRepository;
    constructor(countriesRepository: CountriesRepository);
    findAll(): Promise<any[]>;
}
