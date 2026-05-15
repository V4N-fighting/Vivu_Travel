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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const bookings_repository_1 = require("./bookings.repository");
const coupons_repository_1 = require("../coupons/coupons.repository");
const email_service_1 = require("../email/email.service");
const tours_repository_1 = require("../tours/tours.repository");
const users_repository_1 = require("../users/users.repository");
let BookingsService = class BookingsService {
    constructor(bookingsRepository, couponsRepository, emailService, toursRepository, usersRepository) {
        this.bookingsRepository = bookingsRepository;
        this.couponsRepository = couponsRepository;
        this.emailService = emailService;
        this.toursRepository = toursRepository;
        this.usersRepository = usersRepository;
    }
    async create(bookingData) {
        try {
            let finalPrice = bookingData.totalPrice;
            if (bookingData.couponCode) {
                const coupon = await this.couponsRepository.findByCode(bookingData.couponCode);
                if (!coupon) {
                    throw new common_1.BadRequestException('Mã giảm giá không hợp lệ hoặc đã hết hạn');
                }
                if (bookingData.totalPrice < coupon.min_order_value) {
                    throw new common_1.BadRequestException(`Đơn hàng tối thiểu ${coupon.min_order_value} để áp dụng mã này`);
                }
                let discount = 0;
                if (coupon.discount_type === 'percentage') {
                    discount = (bookingData.totalPrice * coupon.discount_value) / 100;
                    if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
                        discount = coupon.max_discount_amount;
                    }
                }
                else {
                    discount = coupon.discount_value;
                }
                finalPrice = bookingData.totalPrice - discount;
                await this.couponsRepository.incrementUsedCount(coupon.id);
                bookingData.couponId = coupon.id;
            }
            const booking = await this.bookingsRepository.create({ ...bookingData, totalPrice: finalPrice });
            this.sendEmailSafely(booking, bookingData.userId);
            return {
                message: 'Booking created successfully',
                booking,
            };
        }
        catch (error) {
            if (error.message === 'Not enough slots available') {
                throw new common_1.BadRequestException('The selected tour has no slots left for this date.');
            }
            throw error;
        }
    }
    async sendEmailSafely(booking, userId) {
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
        }
        catch (emailError) {
            console.error('Lỗi khi gửi email xác nhận:', emailError);
        }
    }
    async findByUser(userId) {
        return this.bookingsRepository.findByUser(userId);
    }
    async findById(id) {
        const booking = await this.bookingsRepository.findById(id);
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bookings_repository_1.BookingsRepository,
        coupons_repository_1.CouponsRepository,
        email_service_1.EmailService,
        tours_repository_1.ToursRepository,
        users_repository_1.UsersRepository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map