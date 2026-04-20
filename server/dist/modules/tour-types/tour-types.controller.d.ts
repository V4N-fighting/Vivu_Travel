import { TourTypesService } from './tour-types.service';
export declare class TourTypesController {
    private readonly tourTypesService;
    constructor(tourTypesService: TourTypesService);
    findAll(): Promise<any[]>;
}
