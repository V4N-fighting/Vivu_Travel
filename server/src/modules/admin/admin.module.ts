import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminToursRepository } from './tours.admin.repository';
import { AdminBookingsRepository } from './bookings.admin.repository';
import { AdminUsersRepository } from './users.admin.repository';
import { CouponsRepository } from '../coupons/coupons.repository';
import { ExportService } from './export.service';
import { ReviewsRepository } from '../reviews/reviews.repository';
import { CountriesRepository } from '../countries/countries.repository';
import { ActivitiesRepository } from '../activities/activities.repository';
import { ContactsRepository } from '../contacts/contacts.repository';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BannersRepository } from '../banners/banners.repository';

@Module({
  controllers: [AdminController],
  providers: [
    AdminRepository, 
    AdminToursRepository, 
    AdminBookingsRepository, 
    AdminUsersRepository,
    CouponsRepository,
    ExportService,
    ReviewsRepository,
    CountriesRepository,
    ActivitiesRepository,
    ContactsRepository,
    BlogsRepository,
    BannersRepository
  ],
  exports: [AdminRepository, AdminToursRepository, AdminBookingsRepository, AdminUsersRepository]
})
export class AdminModule {}
