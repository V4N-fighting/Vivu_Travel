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
export declare class AdminController {
    private readonly adminRepo;
    private readonly toursRepo;
    private readonly bookingsRepo;
    private readonly usersRepo;
    private readonly couponsRepo;
    private readonly exportService;
    private readonly reviewsRepo;
    private readonly countriesRepo;
    private readonly activitiesRepo;
    private readonly contactsRepo;
    private readonly blogsRepo;
    private readonly bannersRepo;
    constructor(adminRepo: AdminRepository, toursRepo: AdminToursRepository, bookingsRepo: AdminBookingsRepository, usersRepo: AdminUsersRepository, couponsRepo: CouponsRepository, exportService: ExportService, reviewsRepo: ReviewsRepository, countriesRepo: CountriesRepository, activitiesRepo: ActivitiesRepository, contactsRepo: ContactsRepository, blogsRepo: BlogsRepository, bannersRepo: BannersRepository);
    getStats(): Promise<{
        revenue: number;
        bookings: number;
        tours: number;
        users: number;
        recentBookings: any[];
        popularTours: any[];
        revenueByMonth: any[];
        statusCounts: any[];
    }>;
    getAllTours(): Promise<any[]>;
    createTour(data: any, file: Express.Multer.File): Promise<any>;
    updateTour(id: number, data: any, file: Express.Multer.File): Promise<any>;
    deleteTour(id: number): Promise<{
        success: boolean;
    }>;
    getTourActivities(id: number): Promise<any[]>;
    syncTourActivities(id: number, activityIds: number[]): Promise<{
        success: boolean;
    }>;
    getTourDepartures(id: number): Promise<any[]>;
    addTourDeparture(id: number, data: any): Promise<any>;
    deleteTourDeparture(id: number): Promise<{
        success: boolean;
    }>;
    getTourItineraries(id: number): Promise<any[]>;
    addTourItinerary(id: number, data: any): Promise<any>;
    deleteTourItinerary(id: number): Promise<{
        success: boolean;
    }>;
    getTourImages(id: number): Promise<any[]>;
    addTourImage(id: number, imageUrl: string, isPrimary: string, file: Express.Multer.File): Promise<any>;
    getAllTourTypes(): Promise<any[]>;
    createTourType(data: any, file: Express.Multer.File): Promise<any>;
    updateTourType(id: number, data: any, file: Express.Multer.File): Promise<any>;
    deleteTourType(id: number): Promise<{
        success: boolean;
    }>;
    getAllBookings(): Promise<any[]>;
    updateStatus(id: number, status: string): Promise<any>;
    getAllUsers(): Promise<any[]>;
    toggleUser(id: number, isActive: boolean): Promise<any>;
    getAllCoupons(): Promise<any[]>;
    createCoupon(data: any): Promise<any>;
    updateCoupon(id: number, data: any): Promise<any>;
    exportTravelers(bookingId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllReviews(): Promise<any[]>;
    replyReview(id: number, reply: string): Promise<any>;
    getAllCountries(): Promise<any[]>;
    createCountry(data: any, file: Express.Multer.File): Promise<any>;
    updateCountry(id: number, data: any, file: Express.Multer.File): Promise<any>;
    deleteCountry(id: number): Promise<{
        success: boolean;
    }>;
    getAllActivities(): Promise<any[]>;
    createActivity(data: any, file: Express.Multer.File): Promise<any>;
    updateActivity(id: number, data: any, file: Express.Multer.File): Promise<any>;
    deleteActivity(id: number): Promise<{
        message: string;
    }>;
    getAllContacts(): Promise<any[]>;
    markContactRead(id: number, isRead: boolean): Promise<any>;
    deleteContact(id: number): Promise<{
        success: boolean;
    }>;
    getAllBlogs(): Promise<any[]>;
    createBlog(data: any, file: Express.Multer.File): Promise<any>;
    updateBlog(id: number, data: any, file: Express.Multer.File): Promise<any>;
    deleteBlog(id: number): Promise<{
        message: string;
    }>;
    getAllBanners(): Promise<any[]>;
    createBanner(files: {
        firstImage?: Express.Multer.File[];
        secondImage?: Express.Multer.File[];
    }, data: any): Promise<any>;
    updateBanner(id: number, files: {
        firstImage?: Express.Multer.File[];
        secondImage?: Express.Multer.File[];
    }, data: any): Promise<any>;
    deleteBanner(id: number): Promise<{
        message: string;
    }>;
}
