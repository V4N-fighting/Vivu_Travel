import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PostgresModule } from './database/postgres.module';
import { AuthModule } from './modules/auth/auth.module';
import { ToursModule } from './modules/tours/tours.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BannersModule } from './modules/banners/banners.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { CountriesModule } from './modules/countries/countries.module';
import { TourTypesModule } from './modules/tour-types/tour-types.module';
import { UsersModule } from './modules/users/users.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    PostgresModule,
    AuthModule,
    UsersModule,
    ToursModule,
    BookingsModule,
    BannersModule,
    ActivitiesModule,
    CountriesModule,
    TourTypesModule,
    ContactsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

