"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let NotificationsService = class NotificationsService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.MAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }
    async sendBookingConfirmation(email, bookingDetails) {
        const mailOptions = {
            from: '"Vivu Travel" <no-reply@vivutravel.com>',
            to: email,
            subject: `Xác nhận đặt tour thành công - Mã đơn: ${bookingDetails.booking_code}`,
            html: `
        <h1>Cảm ơn bạn đã đặt tour tại Vivu Travel!</h1>
        <p>Mã đặt chỗ của bạn là: <strong>${bookingDetails.booking_code}</strong></p>
        <p>Tour: ${bookingDetails.tour_name}</p>
        <p>Ngày khởi hành: ${bookingDetails.departure_date}</p>
        <p>Tổng tiền: ${bookingDetails.total_price.toLocaleString()} đ</p>
        <p>Chúng tôi sẽ sớm liên hệ với bạn để hoàn tất thủ tục.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Lỗi gửi email:', error);
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map