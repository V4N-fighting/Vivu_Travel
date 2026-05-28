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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const admin_repository_1 = require("./admin.repository");
const tours_admin_repository_1 = require("./tours.admin.repository");
const bookings_admin_repository_1 = require("./bookings.admin.repository");
const users_admin_repository_1 = require("./users.admin.repository");
const coupons_repository_1 = require("../coupons/coupons.repository");
const export_service_1 = require("./export.service");
const reviews_repository_1 = require("../reviews/reviews.repository");
const countries_repository_1 = require("../countries/countries.repository");
const activities_repository_1 = require("../activities/activities.repository");
const contacts_repository_1 = require("../contacts/contacts.repository");
const blogs_repository_1 = require("../blogs/blogs.repository");
const banners_repository_1 = require("../banners/banners.repository");
let AdminController = class AdminController {
    constructor(adminRepo, toursRepo, bookingsRepo, usersRepo, couponsRepo, exportService, reviewsRepo, countriesRepo, activitiesRepo, contactsRepo, blogsRepo, bannersRepo) {
        this.adminRepo = adminRepo;
        this.toursRepo = toursRepo;
        this.bookingsRepo = bookingsRepo;
        this.usersRepo = usersRepo;
        this.couponsRepo = couponsRepo;
        this.exportService = exportService;
        this.reviewsRepo = reviewsRepo;
        this.countriesRepo = countriesRepo;
        this.activitiesRepo = activitiesRepo;
        this.contactsRepo = contactsRepo;
        this.blogsRepo = blogsRepo;
        this.bannersRepo = bannersRepo;
    }
    async getStats() {
        return this.adminRepo.getDashboardStats();
    }
    async getAllTours() {
        return this.toursRepo.findAll();
    }
    async createTour(data, file) {
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
    async updateTour(id, data, file) {
        if (file) {
            data.image = file.filename;
        }
        else if (data.image && data.image.startsWith('blob:')) {
            delete data.image;
        }
        const tour = await this.toursRepo.updateTour(id, data);
        if (data.activity_ids) {
            const activities = Array.isArray(data.activity_ids) ? data.activity_ids : JSON.parse(data.activity_ids);
            await this.toursRepo.syncTourActivities(id, activities);
        }
        return tour;
    }
    async deleteTour(id) {
        return this.toursRepo.deleteTour(id);
    }
    async getTourActivities(id) {
        return this.toursRepo.getTourActivities(id);
    }
    async syncTourActivities(id, activityIds) {
        return this.toursRepo.syncTourActivities(id, activityIds);
    }
    async getTourDepartures(id) {
        return this.toursRepo.getDepartureDates(id);
    }
    async addTourDeparture(id, data) {
        return this.toursRepo.addDepartureDate(id, data);
    }
    async deleteTourDeparture(id) {
        return this.toursRepo.deleteDepartureDate(id);
    }
    async getTourItineraries(id) {
        const query = 'SELECT * FROM tour_itineraries WHERE tour_id = $1 ORDER BY day_number ASC';
        const result = await this.adminRepo.getPool().query(query, [id]);
        return result.rows;
    }
    async addTourItinerary(id, data) {
        const query = `
      INSERT INTO tour_itineraries (tour_id, day_number, title, description)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
        const result = await this.adminRepo.getPool().query(query, [id, data.day_number, data.title, data.description]);
        return result.rows[0];
    }
    async deleteTourItinerary(id) {
        const query = 'DELETE FROM tour_itineraries WHERE id = $1';
        await this.adminRepo.getPool().query(query, [id]);
        return { success: true };
    }
    async getTourImages(id) {
        return this.toursRepo.getTourImages(id);
    }
    async addTourImage(id, imageUrl, isPrimary, file) {
        let finalUrl = imageUrl;
        if (file) {
            finalUrl = file.filename;
        }
        return this.toursRepo.addTourImage(id, finalUrl, isPrimary === 'true');
    }
    async getAllTourTypes() {
        return this.toursRepo.getAllTourTypes();
    }
    async createTourType(data, file) {
        if (file) {
            data.image = file.filename;
        }
        return this.toursRepo.createTourType(data);
    }
    async updateTourType(id, data, file) {
        if (file) {
            data.image = file.filename;
        }
        else if (data.image && data.image.startsWith('blob:')) {
            delete data.image;
        }
        return this.toursRepo.updateTourType(id, data);
    }
    async deleteTourType(id) {
        return this.toursRepo.deleteTourType(id);
    }
    async getAllBookings() {
        return this.bookingsRepo.findAllBookings();
    }
    async updateStatus(id, status) {
        return this.bookingsRepo.updateBookingStatus(id, status);
    }
    async getAllUsers() {
        return this.usersRepo.findAllUsers();
    }
    async toggleUser(id, isActive) {
        return this.usersRepo.toggleUserStatus(id, isActive);
    }
    async getAllCoupons() {
        return this.couponsRepo.findAll();
    }
    async createCoupon(data) {
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
    async updateCoupon(id, data) {
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
    async exportTravelers(bookingId, res) {
        const csvData = await this.exportService.exportTravelersToCsv(bookingId);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=travelers_booking_${bookingId}.csv`);
        return res.send(csvData);
    }
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
    async replyReview(id, reply) {
        return this.reviewsRepo.updateAdminReply(id, reply);
    }
    async getAllCountries() {
        return this.countriesRepo.findAll();
    }
    async createCountry(data, file) {
        if (file) {
            data.image = file.filename;
        }
        return this.countriesRepo.create(data);
    }
    async updateCountry(id, data, file) {
        if (file) {
            data.image = file.filename;
        }
        return this.countriesRepo.update(id, data);
    }
    async deleteCountry(id) {
        return this.countriesRepo.delete(id);
    }
    async getAllActivities() {
        return this.activitiesRepo.findAll();
    }
    async createActivity(data, file) {
        if (file) {
            data.icon = file.filename;
        }
        return this.activitiesRepo.create(data);
    }
    async updateActivity(id, data, file) {
        if (file) {
            data.icon = file.filename;
        }
        return this.activitiesRepo.update(id, data);
    }
    async deleteActivity(id) {
        return this.activitiesRepo.delete(id);
    }
    async getAllContacts() {
        return this.contactsRepo.findAll();
    }
    async markContactRead(id, isRead) {
        return this.contactsRepo.updateReadStatus(id, isRead);
    }
    async deleteContact(id) {
        return this.contactsRepo.delete(id);
    }
    async getAllBlogs() {
        return this.blogsRepo.findAll();
    }
    async createBlog(data, file) {
        if (file) {
            data.thumbnail = file.filename;
        }
        return this.blogsRepo.create(data);
    }
    async updateBlog(id, data, file) {
        if (file) {
            data.thumbnail = file.filename;
        }
        else if (data.thumbnail && data.thumbnail.startsWith('blob:')) {
            delete data.thumbnail;
        }
        return this.blogsRepo.update(id, data);
    }
    async deleteBlog(id) {
        return this.blogsRepo.delete(id);
    }
    async getAllBanners() {
        return this.bannersRepo.findAll();
    }
    async createBanner(files, data) {
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
    async updateBanner(id, files, data) {
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
    async deleteBanner(id) {
        return this.bannersRepo.delete(id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('tours'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllTours", null);
__decorate([
    (0, common_1.Post)('tours'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/tours',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createTour", null);
__decorate([
    (0, common_1.Put)('tours/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/tours',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTour", null);
__decorate([
    (0, common_1.Delete)('tours/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTour", null);
__decorate([
    (0, common_1.Get)('tours/:id/activities'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTourActivities", null);
__decorate([
    (0, common_1.Put)('tours/:id/activities'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('activity_ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "syncTourActivities", null);
__decorate([
    (0, common_1.Get)('tours/:id/departures'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTourDepartures", null);
__decorate([
    (0, common_1.Post)('tours/:id/departures'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addTourDeparture", null);
__decorate([
    (0, common_1.Delete)('tours/departures/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTourDeparture", null);
__decorate([
    (0, common_1.Get)('tours/:id/itineraries'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTourItineraries", null);
__decorate([
    (0, common_1.Post)('tours/:id/itineraries'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addTourItinerary", null);
__decorate([
    (0, common_1.Delete)('tours/itineraries/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTourItinerary", null);
__decorate([
    (0, common_1.Get)('tours/:id/images'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTourImages", null);
__decorate([
    (0, common_1.Post)('tours/:id/images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/tours',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('imageUrl')),
    __param(2, (0, common_1.Body)('isPrimary')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addTourImage", null);
__decorate([
    (0, common_1.Get)('tour-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllTourTypes", null);
__decorate([
    (0, common_1.Post)('tour-types'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/tour-types',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createTourType", null);
__decorate([
    (0, common_1.Put)('tour-types/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/tour-types',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTourType", null);
__decorate([
    (0, common_1.Delete)('tour-types/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTourType", null);
__decorate([
    (0, common_1.Get)('bookings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllBookings", null);
__decorate([
    (0, common_1.Put)('bookings/:id/status'),
    (0, common_1.Post)('bookings/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)('users/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('is_active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "toggleUser", null);
__decorate([
    (0, common_1.Get)('coupons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCoupons", null);
__decorate([
    (0, common_1.Post)('coupons'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createCoupon", null);
__decorate([
    (0, common_1.Put)('coupons/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCoupon", null);
__decorate([
    (0, common_1.Get)('export/travelers/:bookingId'),
    __param(0, (0, common_1.Param)('bookingId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "exportTravelers", null);
__decorate([
    (0, common_1.Get)('reviews'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.Put)('reviews/:id/reply'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('reply')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "replyReview", null);
__decorate([
    (0, common_1.Get)('countries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCountries", null);
__decorate([
    (0, common_1.Post)('countries'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/countries',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createCountry", null);
__decorate([
    (0, common_1.Put)('countries/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/countries',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCountry", null);
__decorate([
    (0, common_1.Delete)('countries/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteCountry", null);
__decorate([
    (0, common_1.Get)('activities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllActivities", null);
__decorate([
    (0, common_1.Post)('activities'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/activities',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createActivity", null);
__decorate([
    (0, common_1.Put)('activities/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/activities',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateActivity", null);
__decorate([
    (0, common_1.Delete)('activities/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteActivity", null);
__decorate([
    (0, common_1.Get)('contacts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllContacts", null);
__decorate([
    (0, common_1.Put)('contacts/:id/read'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('is_read')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "markContactRead", null);
__decorate([
    (0, common_1.Delete)('contacts/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteContact", null);
__decorate([
    (0, common_1.Get)('blogs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllBlogs", null);
__decorate([
    (0, common_1.Post)('blogs'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/blogs',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Put)('blogs/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/blogs',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                const extension = (0, path_1.extname)(file.originalname);
                return cb(null, `${originalName}-${uniqueSuffix}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)('blogs/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Get)('banners'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllBanners", null);
__decorate([
    (0, common_1.Post)('banners'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'firstImage', maxCount: 1 },
        { name: 'secondImage', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/banners',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                cb(null, `${originalName}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createBanner", null);
__decorate([
    (0, common_1.Put)('banners/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'firstImage', maxCount: 1 },
        { name: 'secondImage', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/banners',
            filename: (req, file, cb) => {
                const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
                const originalName = file.originalname.replace(/\s+/g, '-').split('.').slice(0, -1).join('.');
                cb(null, `${originalName}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateBanner", null);
__decorate([
    (0, common_1.Delete)('banners/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteBanner", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        tours_admin_repository_1.AdminToursRepository,
        bookings_admin_repository_1.AdminBookingsRepository,
        users_admin_repository_1.AdminUsersRepository,
        coupons_repository_1.CouponsRepository,
        export_service_1.ExportService,
        reviews_repository_1.ReviewsRepository,
        countries_repository_1.CountriesRepository,
        activities_repository_1.ActivitiesRepository,
        contacts_repository_1.ContactsRepository,
        blogs_repository_1.BlogsRepository,
        banners_repository_1.BannersRepository])
], AdminController);
//# sourceMappingURL=admin.controller.js.map