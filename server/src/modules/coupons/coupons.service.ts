import { Injectable, NotFoundException } from '@nestjs/common';
import { CouponsRepository } from './coupons.repository';

@Injectable()
export class CouponsService {
  constructor(private readonly couponsRepository: CouponsRepository) {}

  async findByCode(code: string) {
    const coupon = await this.couponsRepository.findByCode(code);
    if (!coupon) {
      throw new NotFoundException('Mã giảm giá không hợp lệ hoặc đã hết hạn');
    }
    return coupon;
  }

  async findAll() {
    return this.couponsRepository.findAll();
  }
}
