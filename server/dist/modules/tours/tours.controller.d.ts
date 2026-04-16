import { ToursService } from './tours.service';
export declare class ToursController {
    private readonly toursService;
    constructor(toursService: ToursService);
    findAll(countryId: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(tourData: any): Promise<any>;
}
