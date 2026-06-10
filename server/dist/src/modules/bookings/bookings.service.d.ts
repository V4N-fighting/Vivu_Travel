import { BookingsRepository } from "./bookings.repository";
import { CouponsRepository } from "../coupons/coupons.repository";
import { EmailService } from "../email/email.service";
import { UsersRepository } from "../users/users.repository";
export declare class BookingsService {
    private readonly bookingsRepository;
    private readonly couponsRepository;
    private readonly emailService;
    private readonly usersRepository;
    constructor(bookingsRepository: BookingsRepository, couponsRepository: CouponsRepository, emailService: EmailService, usersRepository: UsersRepository);
    create(bookingData: any): Promise<{
        message: string;
        booking: any;
    }>;
    private sendEmailSafely;
    findByUser(userId: number): Promise<any[]>;
    findById(id: number): Promise<any>;
}
