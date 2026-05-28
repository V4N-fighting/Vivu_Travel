import { Pool } from 'pg';
export declare class AdminToursRepository {
    private readonly pool;
    constructor(pool: Pool);
    createTour(data: any): Promise<any>;
    updateTour(id: number, data: any): Promise<any>;
    deleteTour(id: number): Promise<{
        success: boolean;
    }>;
    findAll(): Promise<any[]>;
    addDepartureDate(tourId: number, data: any): Promise<any>;
    getDepartureDates(tourId: number): Promise<any[]>;
    deleteDepartureDate(id: number): Promise<{
        success: boolean;
    }>;
    addTourImage(tourId: number, imageUrl: string, isPrimary?: boolean): Promise<any>;
    getTourImages(tourId: number): Promise<any[]>;
    deleteTourImage(id: number): Promise<{
        success: boolean;
    }>;
    getAllTourTypes(): Promise<any[]>;
    createTourType(data: any): Promise<any>;
    updateTourType(id: number, data: any): Promise<any>;
    deleteTourType(id: number): Promise<{
        success: boolean;
    }>;
    getTourActivities(tourId: number): Promise<any[]>;
    syncTourActivities(tourId: number, activityIds: number[]): Promise<{
        success: boolean;
    }>;
}
