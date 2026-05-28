import { TourTypesRepository } from './tour-types.repository';
export declare class TourTypesService {
    private readonly tourTypesRepository;
    constructor(tourTypesRepository: TourTypesRepository);
    findAll(): Promise<any[]>;
}
