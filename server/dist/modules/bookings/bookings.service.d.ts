import { BookingsRepository } from './bookings.repository';
export declare class BookingsService {
    private readonly bookingsRepository;
    constructor(bookingsRepository: BookingsRepository);
    create(bookingData: any): Promise<{
        message: string;
        booking: any;
    }>;
    findByUser(userId: number): Promise<any[]>;
    findById(id: number): Promise<any>;
}
