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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        const user = this.configService.get('mail.user');
        const pass = this.configService.get('mail.password');
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('mail.host') || 'smtp.gmail.com',
            port: this.configService.get('mail.port') || 587,
            secure: false,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        this.transporter.verify((error) => {
            if (error) {
                console.error('Email configuration error:', error.message);
            }
            else {
                console.log('Email system is ready.');
            }
        });
    }
    async sendBookingConfirmation(booking, tour, user) {
        const mailFrom = this.configService.get('mail.from');
        const totalAmount = this.formatCurrency(booking.total_price);
        const payment = booking.payment || {};
        const paymentAmount = this.formatCurrency(payment.amount || booking.total_price);
        const departureDate = booking.departure_date
            ? new Date(booking.departure_date).toLocaleDateString('vi-VN')
            : 'Dang cap nhat';
        const createdAt = booking.created_at
            ? new Date(booking.created_at).toLocaleString('vi-VN')
            : new Date().toLocaleString('vi-VN');
        const travelerRows = this.renderTravelerRows(booking.travelers || []);
        const note = booking.note ? this.escapeHtml(booking.note).replace(/\n/g, '<br>') : 'Khong co';
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 760px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #ff681a; padding: 28px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 28px; letter-spacing: 1px;">Vivu Travel</h1>
          <p style="color: #fff; margin: 8px 0 0; font-size: 17px;">Xac nhan dat tour va thanh toan</p>
        </div>

        <div style="padding: 28px; background: #fff;">
          <p style="font-size: 16px; margin-top: 0;">Chao <strong>${this.escapeHtml(this.getFullName(user))}</strong>,</p>
          <p>Vivu Travel da ghi nhan don dat tour cua ban. Email nay tong hop lai cac thong tin ban da nhap de ban doi chieu va xac thuc booking.</p>

          ${this.renderSectionTitle('Thong tin booking')}
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
            ${this.renderInfoRow('Ma dat tour', `#${booking.booking_code}`, true)}
            ${this.renderInfoRow('Ngay tao don', createdAt)}
            ${this.renderInfoRow('Trang thai booking', this.getBookingStatusLabel(booking.status))}
            ${this.renderInfoRow('Tour', tour?.name || booking.tour_name || '')}
            ${this.renderInfoRow('Diem den', tour?.country_name || booking.country_name || 'Dang cap nhat')}
            ${this.renderInfoRow('Loai tour', tour?.tour_type_name || booking.tour_type_name || 'Dang cap nhat')}
            ${this.renderInfoRow('Thoi luong', tour?.duration || booking.duration || 'Dang cap nhat')}
            ${this.renderInfoRow('Ngay khoi hanh', departureDate)}
            ${this.renderInfoRow('So luong', `${booking.adult_count || 0} nguoi lon, ${booking.child_count || 0} tre em`)}
          </table>

          ${this.renderSectionTitle('Thong tin nguoi dat')}
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
            ${this.renderInfoRow('Ho ten tai khoan', this.getFullName(user))}
            ${this.renderInfoRow('Email nhan xac nhan', user.email || '')}
            ${this.renderInfoRow('So dien thoai tai khoan', user.phone || 'Chua cap nhat')}
            ${this.renderInfoRow('Dia chi tai khoan', user.address || 'Chua cap nhat')}
          </table>

          ${this.renderSectionTitle('Danh sach hanh khach da nhap')}
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px; font-size: 13px;">
            <thead>
              <tr style="background: #fff7ed;">
                <th style="${this.thStyle()}">#</th>
                <th style="${this.thStyle()}">Loai</th>
                <th style="${this.thStyle()}">Ho ten</th>
                <th style="${this.thStyle()}">Email</th>
                <th style="${this.thStyle()}">Dien thoai</th>
                <th style="${this.thStyle()}">Quoc gia</th>
                <th style="${this.thStyle()}">Dia chi</th>
              </tr>
            </thead>
            <tbody>${travelerRows}</tbody>
          </table>

          ${this.renderSectionTitle('Thong tin thanh toan')}
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
            ${this.renderInfoRow('Phuong thuc', this.getPaymentMethodLabel(payment.method))}
            ${this.renderInfoRow('Trang thai thanh toan', this.getPaymentStatusLabel(payment.status))}
            ${this.renderInfoRow('So tien thanh toan', paymentAmount)}
            ${this.renderInfoRow('Tong tien booking', totalAmount, true)}
          </table>

          ${this.renderSectionTitle('Yeu cau dac biet')}
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; background: #fafafa; margin-bottom: 22px;">${note}</div>

          <p style="font-size: 14px; color: #666;">Neu co thong tin nao chua dung, vui long lien he Vivu Travel som de duoc ho tro dieu chinh.</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee;">
          <p style="margin: 5px 0;">Day la email tu dong, vui long khong phan hoi email nay.</p>
          <p style="margin: 5px 0;">Hotline ho tro: <strong>0346.176.591</strong></p>
          <p style="margin: 5px 0;">&copy; 2026 Vivu Travel. All rights reserved.</p>
        </div>
      </div>
    `;
        await this.transporter.sendMail({
            from: mailFrom,
            to: user.email,
            subject: `[Vivu Travel] Xac nhan dat tour - ${booking.booking_code}`,
            html: htmlContent,
        });
    }
    async sendContactReply(to, subject, originalMessage, replyMessage) {
        const mailFrom = this.configService.get('mail.from');
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0284c7; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Vivu Travel</h1>
          <p style="color: white; margin: 5px 0 0;">Phan hoi tu doi ngu ho tro</p>
        </div>
        <div style="padding: 20px;">
          <p>Chao ban,</p>
          <p>Cam on ban da lien he voi Vivu Travel. Day la phan hoi chinh thuc tu chung toi cho yeu cau cua ban:</p>

          <div style="background-color: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 20px 0;">
            <p style="margin: 0;">${this.escapeHtml(replyMessage).replace(/\n/g, '<br>')}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

          <p style="color: #777; font-size: 14px;"><strong>Tin nhan goc cua ban ve chu de "${this.escapeHtml(subject)}":</strong></p>
          <div style="color: #777; font-size: 14px; font-style: italic; padding: 10px; background: #f9f9f9;">
            ${this.escapeHtml(originalMessage).replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p>&copy; 2026 Vivu Travel. All rights reserved.</p>
        </div>
      </div>
    `;
        await this.transporter.sendMail({
            from: mailFrom,
            to,
            subject: `Re: [Vivu Travel] ${subject}`,
            html: htmlContent,
        });
    }
    renderTravelerRows(travelers) {
        if (!travelers.length) {
            return `
        <tr>
          <td colspan="7" style="${this.tdStyle()} text-align: center; color: #777;">Chua co thong tin hanh khach</td>
        </tr>
      `;
        }
        return travelers
            .map((traveler, index) => `
        <tr>
          <td style="${this.tdStyle()}">${index + 1}</td>
          <td style="${this.tdStyle()}">${this.escapeHtml(this.getTravelerTypeLabel(traveler.type))}</td>
          <td style="${this.tdStyle()}">${this.escapeHtml(traveler.full_name || '')}</td>
          <td style="${this.tdStyle()}">${this.escapeHtml(traveler.email || 'Khong co')}</td>
          <td style="${this.tdStyle()}">${this.escapeHtml(traveler.phone || 'Khong co')}</td>
          <td style="${this.tdStyle()}">${this.escapeHtml(traveler.country || 'Khong co')}</td>
          <td style="${this.tdStyle()}">${this.escapeHtml(traveler.address || 'Khong co')}</td>
        </tr>
      `)
            .join('');
    }
    renderSectionTitle(title) {
        return `<h2 style="font-size: 17px; margin: 24px 0 12px; color: #ff681a; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">${title}</h2>`;
    }
    renderInfoRow(label, value, highlight = false) {
        return `
      <tr>
        <td style="padding: 9px 0; color: #666; border-bottom: 1px solid #f3f4f6;">${this.escapeHtml(label)}:</td>
        <td style="padding: 9px 0; text-align: right; border-bottom: 1px solid #f3f4f6; ${highlight ? 'font-weight: bold; color: #ff681a;' : ''}">${this.escapeHtml(value || 'Khong co')}</td>
      </tr>
    `;
    }
    thStyle() {
        return 'padding: 10px 8px; text-align: left; border: 1px solid #e5e7eb; color: #444;';
    }
    tdStyle() {
        return 'padding: 9px 8px; border: 1px solid #e5e7eb; vertical-align: top;';
    }
    formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(Number(value || 0));
    }
    getFullName(user) {
        return [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'Khach hang';
    }
    getTravelerTypeLabel(type) {
        if (type === 'adult')
            return 'Nguoi lon';
        if (type === 'child')
            return 'Tre em';
        return type || 'Khach';
    }
    getPaymentMethodLabel(method) {
        const labels = {
            cash: 'Tien mat',
            bank_transfer: 'Chuyen khoan',
            momo: 'Vi MoMo',
            vnpay: 'VNPay',
            credit_card: 'The tin dung/ghi no',
        };
        return labels[method] || method || 'Chua cap nhat';
    }
    getPaymentStatusLabel(status) {
        const labels = {
            pending: 'Dang cho thanh toan',
            paid: 'Da thanh toan',
            completed: 'Hoan tat',
            failed: 'That bai',
            refunded: 'Da hoan tien',
        };
        return labels[status] || status || 'Chua cap nhat';
    }
    getBookingStatusLabel(status) {
        const labels = {
            pending: 'Dang cho xac nhan',
            confirmed: 'Da xac nhan',
            cancelled: 'Da huy',
            completed: 'Hoan tat',
        };
        return labels[status] || status || 'Chua cap nhat';
    }
    escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map