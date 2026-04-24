"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const postgres_module_1 = require("./database/postgres.module");
const auth_module_1 = require("./modules/auth/auth.module");
const tours_module_1 = require("./modules/tours/tours.module");
const bookings_module_1 = require("./modules/bookings/bookings.module");
const banners_module_1 = require("./modules/banners/banners.module");
const activities_module_1 = require("./modules/activities/activities.module");
const countries_module_1 = require("./modules/countries/countries.module");
const tour_types_module_1 = require("./modules/tour-types/tour-types.module");
const users_module_1 = require("./modules/users/users.module");
const contacts_module_1 = require("./modules/contacts/contacts.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const blogs_module_1 = require("./modules/blogs/blogs.module");
const admin_module_1 = require("./modules/admin/admin.module");
const email_module_1 = require("./modules/email/email.module");
const coupons_module_1 = require("./modules/coupons/coupons.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
                envFilePath: '.env',
            }),
            postgres_module_1.PostgresModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            tours_module_1.ToursModule,
            bookings_module_1.BookingsModule,
            banners_module_1.BannersModule,
            activities_module_1.ActivitiesModule,
            countries_module_1.CountriesModule,
            tour_types_module_1.TourTypesModule,
            contacts_module_1.ContactsModule,
            reviews_module_1.ReviewsModule,
            blogs_module_1.BlogsModule,
            admin_module_1.AdminModule,
            email_module_1.EmailModule,
            coupons_module_1.CouponsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map