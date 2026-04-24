import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Res, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
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
import { Response } from 'express';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly toursRepo: AdminToursRepository,
    private readonly bookingsRepo: AdminBookingsRepository,
    private readonly usersRepo: AdminUsersRepository,
    private readonly couponsRepo: CouponsRepository,
    private readonly exportService: ExportService,
    private readonly reviewsRepo: ReviewsRepository,
    private readonly countriesRepo: CountriesRepository,
    private readonly activitiesRepo: ActivitiesRepository,
    private readonly contactsRepo: ContactsRepository,
    private readonly blogsRepo: BlogsRepository,
    private readonly bannersRepo: BannersRepository,
  ) {}

  // 1. Dashboard Statistics
  @Get('stats')
  async getStats() {
    return this.adminRepo.getDashboardStats();
  }

  // 2. Quản lý Tours
  @Get('tours')
  async getAllTours() {
    return this.toursRepo.findAll();
  }

  @Post('tours')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/tours',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async createTour(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.image = file.filename;
    }
    const tour = await this.toursRepo.createTour(data);
    if (data.activity_ids) {
      const activities = Array.isArray(data.activity_ids) ? data.activity_ids : JSON.parse(data.activity_ids);
      await this.toursRepo.syncTourActivities(tour.id, activities);
    }
    return tour;
  }

  @Put('tours/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/tours',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async updateTour(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      data.image = file.filename;
    } else if (data.image && data.image.startsWith('blob:')) {
      delete data.image;
    }
    
    const tour = await this.toursRepo.updateTour(id, data);
    if (data.activity_ids) {
      const activities = Array.isArray(data.activity_ids) ? data.activity_ids : JSON.parse(data.activity_ids);
      await this.toursRepo.syncTourActivities(id, activities);
    }
    return tour;
  }

  @Delete('tours/:id')
  async deleteTour(@Param('id', ParseIntPipe) id: number) {
    return this.toursRepo.deleteTour(id);
  }

  // Quản lý Tour - Activities
  @Get('tours/:id/activities')
  async getTourActivities(@Param('id', ParseIntPipe) id: number) {
    return this.toursRepo.getTourActivities(id);
  }

  @Put('tours/:id/activities')
  async syncTourActivities(@Param('id', ParseIntPipe) id: number, @Body('activity_ids') activityIds: number[]) {
    return this.toursRepo.syncTourActivities(id, activityIds);
  }

  // Quản lý ngày khởi hành (Mới)
  @Get('tours/:id/departures')
  async getTourDepartures(@Param('id', ParseIntPipe) id: number) {
    return this.toursRepo.getDepartureDates(id);
  }

  @Post('tours/:id/departures')
  async addTourDeparture(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.toursRepo.addDepartureDate(id, data);
  }

  @Delete('tours/departures/:id')
  async deleteTourDeparture(@Param('id', ParseIntPipe) id: number) {
    return this.toursRepo.deleteDepartureDate(id);
  }

  // Quản lý Hành trình
  @Get('tours/:id/itineraries')
  async getTourItineraries(@Param('id', ParseIntPipe) id: number) {
    const query = 'SELECT * FROM tour_itineraries WHERE tour_id = $1 ORDER BY day_number ASC';
    const result = await this.adminRepo.getPool().query(query, [id]);
    return result.rows;
  }

  @Post('tours/:id/itineraries')
  async addTourItinerary(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const query = `
      INSERT INTO tour_itineraries (tour_id, day_number, title, description)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await this.adminRepo.getPool().query(query, [id, data.day_number, data.title, data.description]);
    return result.rows[0];
  }

  @Delete('tours/itineraries/:id')
  async deleteTourItinerary(@Param('id', ParseIntPipe) id: number) {
    const query = 'DELETE FROM tour_itineraries WHERE id = $1';
    await this.adminRepo.getPool().query(query, [id]);
    return { success: true };
  }

  // Quản lý hình ảnh (Mới)
  @Get('tours/:id/images')
  async getTourImages(@Param('id', ParseIntPipe) id: number) {
    return this.toursRepo.getTourImages(id);
  }

  // 1. API hỗ trợ cả Upload file và Link
  @Post('tours/:id/images')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/tours',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async addTourImage(
    @Param('id', ParseIntPipe) id: number,
    @Param('imageUrl') imageUrl: string,
    @Body('isPrimary') isPrimary: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    let finalUrl = imageUrl;
    
    if (file) {
      finalUrl = file.filename;
    }

    return this.toursRepo.addTourImage(id, finalUrl, isPrimary === 'true');
  }

  // ... (deleteTourImage remains same)

  // Quản lý Loại Tour
  @Get('tour-types')
  async getAllTourTypes() {
    return this.toursRepo.getAllTourTypes();
  }

  @Post('tour-types')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/tour-types',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async createTourType(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.image = file.filename;
    }
    return this.toursRepo.createTourType(data);
  }

  @Put('tour-types/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/tour-types',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async updateTourType(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      data.image = file.filename;
    } else if (data.image && data.image.startsWith('blob:')) {
      delete data.image;
    }
    return this.toursRepo.updateTourType(id, data);
  }

  @Delete('tour-types/:id')
  async deleteTourType(@Param('id', ParseIntPipe) id: number) {
    return this.toursRepo.deleteTourType(id);
  }

  // 3. Quản lý Bookings
  @Get('bookings')
  async getAllBookings() {
    return this.bookingsRepo.findAllBookings();
  }

  @Put('bookings/:id/status')
  @Post('bookings/:id/status')
  async updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.bookingsRepo.updateBookingStatus(id, status);
  }

  // 4. Quản lý Users
  @Get('users')
  async getAllUsers() {
    return this.usersRepo.findAllUsers();
  }

  @Put('users/:id/status')
  async toggleUser(@Param('id', ParseIntPipe) id: number, @Body('is_active') isActive: boolean) {
    return this.usersRepo.toggleUserStatus(id, isActive);
  }

  // 5. Quản lý Coupons
  @Get('coupons')
  async getAllCoupons() {
    return this.couponsRepo.findAll();
  }

  @Post('coupons')
  async createCoupon(@Body() data: any) {
    const couponData = {
      code: data.code,
      discountType: data.discount_type,
      discountValue: data.discount_value,
      validFrom: data.validFrom || null,
      validTo: data.validTo || null,
      usageLimit: data.usage_limit || 100,
      is_active: data.is_active !== undefined ? data.is_active : true,
      min_order_value: data.min_order_value || 0,
      max_discount_amount: data.max_discount_amount || null
    };
    return this.couponsRepo.create(couponData);
  }

  @Put('coupons/:id')
  async updateCoupon(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const couponData = {
      code: data.code,
      discountType: data.discount_type,
      discountValue: data.discount_value,
      validFrom: data.validFrom || null,
      validTo: data.validTo || null,
      usageLimit: data.usage_limit || 100,
      is_active: data.is_active !== undefined ? data.is_active : true,
      min_order_value: data.min_order_value || 0,
      max_discount_amount: data.max_discount_amount || null
    };
    return this.couponsRepo.update(id, couponData);
  }

  // 6. Export Dữ liệu
  @Get('export/travelers/:bookingId')
  async exportTravelers(@Param('bookingId', ParseIntPipe) bookingId: number, @Res() res: Response) {
    const csvData = await this.exportService.exportTravelersToCsv(bookingId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=travelers_booking_${bookingId}.csv`);
    return res.send(csvData);
  }

  // 7. Quản lý Đánh giá
  @Get('reviews')
  async getAllReviews() {
    const query = `
      SELECT r.*, 
             u.first_name, u.last_name, u.avatar,
             t.name as tour_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN tours t ON r.tour_id = t.id
      ORDER BY r.created_at DESC
    `;
    const result = await this.adminRepo.getPool().query(query);
    return result.rows;
  }

  @Put('reviews/:id/reply')
  async replyReview(@Param('id', ParseIntPipe) id: number, @Body('reply') reply: string) {
    return this.reviewsRepo.updateAdminReply(id, reply);
  }

  // 8. Quản lý Countries
  @Get('countries')
  async getAllCountries() {
    return this.countriesRepo.findAll();
  }

  @Post('countries')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/countries',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async createCountry(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.image = file.filename;
    }
    return this.countriesRepo.create(data);
  }

  @Put('countries/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/countries',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async updateCountry(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      data.image = file.filename;
    }
    return this.countriesRepo.update(id, data);
  }

  @Delete('countries/:id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countriesRepo.delete(id);
  }

  // 9. Quản lý Activities
  @Get('activities')
  async getAllActivities() {
    return this.activitiesRepo.findAll();
  }

  @Post('activities')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/activities',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async createActivity(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.icon = file.filename;
    }
    return this.activitiesRepo.create(data);
  }

  @Put('activities/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/activities',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async updateActivity(@Param('id', ParseIntPipe) id: number, @Body() data: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.icon = file.filename;
    }
    return this.activitiesRepo.update(id, data);
  }

  @Delete('activities/:id')
  async deleteActivity(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesRepo.delete(id);
  }

  // 10. Quản lý Contacts (Phản hồi từ khách hàng)
  @Get('contacts')
  async getAllContacts() {
    return this.contactsRepo.findAll();
  }

  @Put('contacts/:id/read')
  async markContactRead(@Param('id', ParseIntPipe) id: number, @Body('is_read') isRead: boolean) {
    return this.contactsRepo.updateReadStatus(id, isRead);
  }

  @Delete('contacts/:id')
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactsRepo.delete(id);
  }

  // 11. Quản lý Blogs
  @Get('blogs')
  async getAllBlogs() {
    return this.blogsRepo.findAll();
  }

  @Post('blogs')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/blogs',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async createBlog(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.thumbnail = file.filename;
    }
    return this.blogsRepo.create(data);
  }

  @Put('blogs/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/blogs',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
        const extension = extname(file.originalname);
        return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
      }
    })
  }))
  async updateBlog(@Param('id', ParseIntPipe) id: number, @Body() data: any, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.thumbnail = file.filename;
    } else if (data.thumbnail && data.thumbnail.startsWith('blob:')) {
      delete data.thumbnail;
    }
    return this.blogsRepo.update(id, data);
  }

  @Delete('blogs/:id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    return this.blogsRepo.delete(id);
  }

  // 12. Quản lý Banners
  @Get('banners')
  async getAllBanners() {
    return this.bannersRepo.findAll();
  }

  @Post('banners')
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'firstImage', maxCount: 1 },
      { name: 'secondImage', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: './uploads/banners',
        filename: (req, file, cb) => {
          const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
          const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
          cb(null, `${originalName}-${uniqueSuffix}${extname(file.originalname)}`);
        }
      })
    }
  ))
  async createBanner(
    @UploadedFiles() files: { firstImage?: Express.Multer.File[]; secondImage?: Express.Multer.File[] },
    @Body() data: any,
  ) {
    const payload = {
      ...data,
      textContent: data.textContent ?? data.title ?? '',
      sortOrder: data.sortOrder ?? data.sort_order ?? 0,
      isActive: data.isActive ?? (data.is_active === 'true' || data.is_active === true),
      page_location: data.page_location ?? 'home',
      firstImage: files?.firstImage?.[0]?.filename ?? data.firstImage ?? '',
      secondImage: files?.secondImage?.[0]?.filename ?? data.secondImage ?? '',
    };

    return this.bannersRepo.create(payload);
  }

  @Put('banners/:id')
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'firstImage', maxCount: 1 },
      { name: 'secondImage', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: './uploads/banners',
        filename: (req, file, cb) => {
          const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
          const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
          cb(null, `${originalName}-${uniqueSuffix}${extname(file.originalname)}`);
        }
      })
    }
  ))
  async updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: { firstImage?: Express.Multer.File[]; secondImage?: Express.Multer.File[] },
    @Body() data: any,
  ) {
    const payload = {
      ...data,
      textContent: data.textContent ?? data.title ?? '',
      sortOrder: data.sortOrder ?? data.sort_order ?? 0,
      isActive: data.isActive ?? (data.is_active === 'true' || data.is_active === true),
      page_location: data.page_location ?? 'home',
      firstImage: files?.firstImage?.[0]?.filename ?? data.firstImage ?? '',
      secondImage: files?.secondImage?.[0]?.filename ?? data.secondImage ?? '',
    };

    return this.bannersRepo.update(id, payload);
  }

  @Delete('banners/:id')
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    return this.bannersRepo.delete(id);
  }
}
