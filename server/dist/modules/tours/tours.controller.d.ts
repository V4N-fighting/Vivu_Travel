import { ToursService } from './tours.service';
export declare class ToursController {
    private readonly toursService;
    constructor(toursService: ToursService);
    findAll(search: string, countryId: number, minPrice: number, maxPrice: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(tourData: any): Promise<any>;
}
