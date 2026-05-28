export declare class NotificationsService {
    private transporter;
    constructor();
    sendBookingConfirmation(email: string, bookingDetails: any): Promise<void>;
}
