import { BookingsRepository } from './bookings.repository';
import { CouponsRepository } from '../coupons/coupons.repository';
import { EmailService } from '../email/email.service';
import { ToursRepository } from '../tours/tours.repository';
import { UsersRepository } from '../users/users.repository';
export declare class BookingsService {
    private readonly bookingsRepository;
    private readonly couponsRepository;
    private readonly emailService;
    private readonly toursRepository;
    private readonly usersRepository;
    constructor(bookingsRepository: BookingsRepository, couponsRepository: CouponsRepository, emailService: EmailService, toursRepository: ToursRepository, usersRepository: UsersRepository);
    create(bookingData: any): Promise<{
        message: string;
        booking: any;
    }>;
    private sendEmailSafely;
    findByUser(userId: number): Promise<any[]>;
    findById(id: number): Promise<any>;
}
