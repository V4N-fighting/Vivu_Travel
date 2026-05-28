import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendBookingConfirmation(booking: any, tour: any, user: any): Promise<void>;
    sendContactReply(to: string, subject: string, originalMessage: string, replyMessage: string): Promise<void>;
}
