import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendBookingConfirmation(booking: any, tour: any, user: any): Promise<void>;
    sendContactReply(to: string, subject: string, originalMessage: string, replyMessage: string): Promise<void>;
    private renderTravelerRows;
    private renderSectionTitle;
    private renderInfoRow;
    private thStyle;
    private tdStyle;
    private formatCurrency;
    private getFullName;
    private getTravelerTypeLabel;
    private getPaymentMethodLabel;
    private getPaymentStatusLabel;
    private getBookingStatusLabel;
    private escapeHtml;
}
