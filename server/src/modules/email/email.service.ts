import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const user = this.configService.get<string>('mail.user');
    const pass = this.configService.get<string>('mail.password');
    
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('mail.host') || 'smtp.gmail.com',
      port: this.configService.get<number>('mail.port') || 587,
      secure: false, 
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    this.transporter.verify((error) => {
      if (error) {
        console.error('❌ Lỗi cấu hình Email:', error.message);
      } else {
        console.log('✅ Hệ thống Email đã sẵn sàng!');
      }
    });
  }

  async sendBookingConfirmation(booking: any, tour: any, user: any) {
    const mailFrom = this.configService.get<string>('mail.from');
    const totalAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.total_price);
    
    // Giao diện email hóa đơn chuyên nghiệp hơn
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #FF681A 0%, #FF8C42 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Vivu Travel</h1>
          <div style="height: 2px; background: rgba(255,255,255,0.3); width: 50px; margin: 15px auto;"></div>
          <p style="color: white; margin: 0; font-size: 18px; font-weight: 300;">HÓA ĐƠN THANH TOÁN</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <p style="font-size: 16px;">Chào <strong>${user.firstName} ${user.lastName}</strong>,</p>
          <p>Chúc mừng! Giao dịch của bạn đã được xác nhận thành công. Dưới đây là thông tin chi tiết hóa đơn điện tử cho chuyến đi sắp tới của bạn.</p>
          
          <div style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 20px; margin: 25px 0; background: #fafafa;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666;">Mã hóa đơn:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #FF681A;">#${booking.booking_code}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Ngày thanh toán:</td>
                <td style="padding: 8px 0; text-align: right;">${new Date().toLocaleDateString('vi-VN')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Tên Tour:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 500;">${tour.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Ngày khởi hành:</td>
                <td style="padding: 8px 0; text-align: right;">${new Date(booking.departure_date).toLocaleDateString('vi-VN')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Số lượng:</td>
                <td style="padding: 8px 0; text-align: right;">${booking.adult_count} Người lớn, ${booking.child_count} Trẻ em</td>
              </tr>
              <tr style="border-top: 2px solid #eee;">
                <td style="padding: 15px 0; font-size: 18px; font-weight: bold;">TỔNG TIỀN:</td>
                <td style="padding: 15px 0; text-align: right; color: #FF681A; font-size: 22px; font-weight: bold;">${totalAmount}</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 14px; color: #888;">Cảm ơn bạn đã lựa chọn Vivu Travel cho hành trình của mình!</p>
            <div style="margin-top: 20px;">
              <span style="display: inline-block; padding: 10px 20px; background: #FF681A; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">ĐÃ THANH TOÁN</span>
            </div>
          </div>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
          <p style="margin: 5px 0;">Đây là email tự động, vui lòng không phản hồi email này.</p>
          <p style="margin: 5px 0;">Hotline hỗ trợ: <strong>0346.176.591</strong></p>
          <p style="margin: 5px 0;">© 2026 Vivu Travel. All rights reserved.</p>
        </div>
      </div>
    `;

    await this.transporter.sendMail({
      from: mailFrom,
      to: user.email,
      subject: `[Vivu Travel] Hóa đơn thanh toán thành công - ${booking.booking_code}`,
      html: htmlContent,
    });
  }

  async sendContactReply(to: string, subject: string, originalMessage: string, replyMessage: string) {
    const mailFrom = this.configService.get<string>('mail.from');
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0284c7; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Vivu Travel</h1>
          <p style="color: white; margin: 5px 0 0;">Phản hồi từ đội ngũ hỗ trợ</p>
        </div>
        <div style="padding: 20px;">
          <p>Chào bạn,</p>
          <p>Cảm ơn bạn đã liên hệ với Vivu Travel. Đây là phản hồi chính thức từ chúng tôi cho yêu cầu của bạn:</p>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 20px 0;">
            <p style="margin: 0;">${replyMessage.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="color: #777; font-size: 14px;"><strong>Tin nhắn gốc của bạn về chủ đề "${subject}":</strong></p>
          <div style="color: #777; font-size: 14px; font-style: italic; padding: 10px; background: #f9f9f9;">
            ${originalMessage.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p>© 2026 Vivu Travel. All rights reserved.</p>
        </div>
      </div>
    `;

    await this.transporter.sendMail({
      from: mailFrom,
      to: to,
      subject: `Re: [Vivu Travel] ${subject}`,
      html: htmlContent,
    });
  }
}
