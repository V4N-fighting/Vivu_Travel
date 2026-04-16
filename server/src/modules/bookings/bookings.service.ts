import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';

@Injectable()
export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async create(bookingData: any) {
    try {
      // Ở đây bạn có thể thêm logic tính toán lại totalPrice từ phía Server
      // để đảm bảo tính an toàn (tránh User gửi giá sai từ Frontend)
      
      const booking = await this.bookingsRepository.create(bookingData);
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
