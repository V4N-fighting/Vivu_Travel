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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const coupons_repository_1 = require("./coupons.repository");
let CouponsService = class CouponsService {
    constructor(couponsRepository) {
        this.couponsRepository = couponsRepository;
    }
    async findByCode(code) {
        const coupon = await this.couponsRepository.findByCode(code);
        if (!coupon) {
            throw new common_1.NotFoundException('Mã giảm giá không hợp lệ hoặc đã hết hạn');
        }
        return coupon;
    }
    async findAll() {
        return this.couponsRepository.findAll();
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coupons_repository_1.CouponsRepository])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map