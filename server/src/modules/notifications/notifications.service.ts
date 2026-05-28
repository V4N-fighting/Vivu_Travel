import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter;

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

  async sendBookingConfirmation(email: string, bookingDetails: any) {
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
    } catch (error) {
      console.error('Lỗi gửi email:', error);
    }
  }
}
