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
let BookingsService = class BookingsService {
    constructor(bookingsRepository) {
        this.bookingsRepository = bookingsRepository;
    }
    async create(bookingData) {
        try {
            const booking = await this.bookingsRepository.create(bookingData);
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
    __metadata("design:paramtypes", [bookings_repository_1.BookingsRepository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map