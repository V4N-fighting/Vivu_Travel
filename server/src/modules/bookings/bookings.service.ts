import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { CouponsRepository } from '../coupons/coupons.repository';
import { EmailService } from '../email/email.service';
import { ToursRepository } from '../tours/tours.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly couponsRepository: CouponsRepository,
    private readonly emailService: EmailService,
    private readonly toursRepository: ToursRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(bookingData: any) {
    try {
      let finalPrice = bookingData.totalPrice;
      
      // 1. Kiểm tra Coupon nếu có
      if (bookingData.couponCode) {
        const coupon = await this.couponsRepository.findByCode(bookingData.couponCode);
        if (!coupon) {
          throw new BadRequestException('Mã giảm giá không hợp lệ hoặc đã hết hạn');
        }

        if (bookingData.totalPrice < coupon.min_order_value) {
          throw new BadRequestException(`Đơn hàng tối thiểu ${coupon.min_order_value} để áp dụng mã này`);
        }

        let discount = 0;
        if (coupon.discount_type === 'percentage') {
          discount = (bookingData.totalPrice * coupon.discount_value) / 100;
          if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
            discount = coupon.max_discount_amount;
          }
        } else {
          discount = coupon.discount_value;
        }

        finalPrice = bookingData.totalPrice - discount;
        
        // Đánh dấu đã dùng coupon
        await this.couponsRepository.incrementUsedCount(coupon.id);
        bookingData.couponId = coupon.id;
      }

      const booking = await this.bookingsRepository.create({ ...bookingData, totalPrice: finalPrice });

      // 3. Gửi email xác nhận (Chạy bất đồng bộ, không đợi để tránh làm chậm response)
      this.sendEmailSafely(booking, bookingData.userId);

      return {
        message: 'Booking created successfully',
        booking,
      };
    } catch (error) {
      if (error.message === 'Not enough slots available') {
        throw new BadRequestException('The selected tour has no slots left for this date.');
      }
      throw error;
    }
  }

  private async sendEmailSafely(booking: any, userId: number) {
    try {
      const [tour, user] = await Promise.all([
        this.toursRepository.findById(booking.tour_id),
        this.usersRepository.findById(userId)
      ]);

      if (tour && user) {
        await this.emailService.sendBookingConfirmation(booking, tour, {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email
        });
        console.log(`Email xác nhận đã gửi đến: ${user.email}`);
      }
    } catch (emailError) {
      console.error('Lỗi khi gửi email xác nhận:', emailError);
    }
  }

  async findByUser(userId: number) {
    return this.bookingsRepository.findByUser(userId);
  }

  async findById(id: number) {
    const booking = await this.bookingsRepository.findById(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }
}
