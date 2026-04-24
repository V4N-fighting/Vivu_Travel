import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsRepository } from './bookings.repository';
import { CouponsRepository } from '../coupons/coupons.repository';
import { ToursRepository } from '../tours/tours.repository';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [BookingsController],
  providers: [
    BookingsService, 
    BookingsRepository, 
    CouponsRepository,
    ToursRepository,
    UsersRepository
  ],
  exports: [BookingsService],
})
export class BookingsModule {}
