import { ToursRepository } from './tours.repository';
export declare class ToursService {
    private readonly toursRepository;
    constructor(toursRepository: ToursRepository);
    findAll(filters: any): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(tourData: any): Promise<any>;
}
