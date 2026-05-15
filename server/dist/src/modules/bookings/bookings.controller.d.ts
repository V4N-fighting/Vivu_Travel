import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(bookingData: any, req: any): Promise<{
        message: string;
        booking: any;
    }>;
    findByUser(userId: number, req: any): Promise<any[]>;
    findById(id: number): Promise<any>;
}
